import React, { useState } from "react";
import gql from "graphql-tag";
import {  useMutation, useSubscription } from "@apollo/client";
import MessageSection from "../components/MessageSection"
import Loader from "./Loader";

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

function Sub() {
  const getMessages = useSubscription(GET_MESSAGES);
	const [createMessage, newMessage] = useMutation(POST_MESSAGE);
	const [content, setContent] = useState("");
	const [name, setName] = useState("");
  const onSubmit = (e) => {
		e.preventDefault();
		console.log(getMessages.data.messages)
    createMessage({
      variables: { user: name, content: content  },
    });
  };
	if(getMessages.loading) {
		return <Loader/>
	}

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
				<input
          className="input"
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" name="submit">
          Add content
        </button>
      </form>
			<div>
				<MessageSection messages={getMessages.data.messages}/>
			</div>
      
    </div>
  );
}

export default Sub;