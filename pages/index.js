import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>MeetUp Points</title>
        <meta name="description" content="Browse a huge list of highly active meetup points"></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </Fragment>
  );
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://aniket:chotu@cluster0.x6e7vlw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return{
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
