
import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "./Loader";
import PetSection from "./PetSection";
const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
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
function Pets() {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);
  const pets = useQuery(ALL_PETS);
  const [createPet, newPet] = useMutation(NEW_PET);
  const [name, setName] = useState("");
  const type = `DOG`;
 
  const onSubmit = (input) => {
    createPet({
      variables: { newPet: input },
    });
  };
  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, type });
  };

  const petsList = pets.data.pets.map((pet) => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetSection pet={pet} />
      </div>
    </div>
  ));

  if (pets.loading || newPet.loading) {
    return <Loader />;
  }
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
      <div>
        {petsList}
      </div>
      
    </div>
  );
}
export default Pets;