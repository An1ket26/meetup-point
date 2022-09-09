import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetuphandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add Meetups</title>
        <meta name="description" content="Add aa new meetups and create amazing networking oppurtunities."></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetuphandler}></NewMeetupForm>
    </Fragment>
  );
};
export default NewMeetupPage;
