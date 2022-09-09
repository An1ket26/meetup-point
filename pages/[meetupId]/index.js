import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    ></MeetupDetail>
    </Fragment>
    
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://aniket:chotu@cluster0.x6e7vlw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking', 
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://aniket:chotu@cluster0.x6e7vlw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup  = await meetupsCollection.findOne({_id:ObjectId(meetupId)})
  client.close();

  return {
    props: {
      meetupData:{
        id:selectedMeetup._id.toString(),
        image:selectedMeetup.image,
        address:selectedMeetup.address,
        description:selectedMeetup.description,
        title:selectedMeetup.title
      }
    },
  };
}

export default MeetupDetails;
