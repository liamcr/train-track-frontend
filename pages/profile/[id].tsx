import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { USER_URL, USER_WORKOUTS_URL } from "../../util/consts";
import ProfileImage from "../../components/ProfileImage";
import { FullUser } from "../../util/commonTypes";
import Timeline from "../../components/Timeline";
import FollowerBar from "../../components/FollowerBar";
import PageWrapper from "../../components/PageWrapper";
import { FollowersProvider } from "../../util/FollowerContextProvider";
import ToastAlert from "../../components/ToastAlert";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getAccessToken } from "../../util/helperFns";

const Profile: React.FC = ({
  user,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [errorMessage, setErrorMessage] = useState(error);

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <PageWrapper navValue="profile" fixedHeader>
      <FollowersProvider>
        <ProfileImage user={user} />
        <FollowerBar
          followers={user ? user.followers : null}
          following={user ? user.following : null}
        />
      </FollowersProvider>
      {user && <Timeline dataUrl={USER_WORKOUTS_URL(user._id)} profile />}
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (typeof id !== "string") {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  try {
    const userRes = await axios.get(USER_URL(id), {
      headers: {
        Authorization: `Bearer ${getAccessToken(context.req)}`,
      },
    });

    const userData = userRes.data as FullUser;

    return {
      props: {
        user: userData,
        error: "",
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        error: (error as AxiosError).message,
      },
    };
  }
};

export default Profile;
