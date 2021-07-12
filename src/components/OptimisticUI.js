import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "./Loader";

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
      owner {
        id
        height @client
      }
    }
  }
`;
const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`;
function OptimisticPets() {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);
  const pets = useQuery(ALL_PETS);
  const [createPet, newPet] = useMutation(NEW_PET, {
    update(cache, { data: { addPet } }) {
      const allPets = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...allPets.pets] },
      });
    },
  });
  const [name, setName] = useState("");
  const type = `DOG`;

  const onSubmit = (input) => {
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          __typename: "Pet",
          id: Math.floor(Math.random() * 1000000) + "",
          type: "CAT",
          name: input.name,
          img: "https://via.placeholder.com/300",
        },
      },
    });
  };
  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, type });
  };
  if (pets.loading) {
    return <Loader />;
  }
  console.log(pets.data.pets[0]);
  const petsList = pets.data.pets.map((pet) => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <div className="pet">
          <div className="pet-name">Owner's height: {pet.owner.height}</div>
          <figure>
            <img src={pet.img + `?pet=${pet.id}`} alt="" />
          </figure>
          <div className="pet-name">{pet.name}</div>
          <div className="pet-type">{pet.type}</div>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      <form onSubmit={submit}>
        <input
          className="input"
          type="text"
          placeholder="pet name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" name="submit">
          add pet
        </button>
      </form>
      <div>{petsList}</div>
    </div>
  );
}
export default OptimisticPets;
