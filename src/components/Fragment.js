import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "./Loader";
import PetSection from "./PetSection";

const DUPLICATE_FIELD = gql`
	fragment PetFields on Pet {
      id
      name
			type
			img
	}
`

const ALL_PETS = gql`
  query AllPets {
		pets {
			...PetFields
		}
  }
	${DUPLICATE_FIELD}
`;

const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
				...PetFields
    }
  }
	${DUPLICATE_FIELD}
`;

function ThePets() {
 
  const pets = useQuery(ALL_PETS);
  const [createPet, newPet] = useMutation(NEW_PET, {
		update(cache, {data: {addPet}}) {
			const allPets = cache.readQuery({query: ALL_PETS})
      cache.writeQuery({
				query: ALL_PETS,
				data: {pets: [addPet, ...allPets.pets]}
			})
		}
	});
  const [name, setName] = useState("");
  const type = `DOG`;
 
  const characters = () => {
    console.log(pets.data.characters);
  };

  const onSubmit = (input) => {
    createPet({
      variables: { newPet: input },
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, type });
  };

  if (pets.loading ) {
    return <Loader />;
  }

  const petsList = pets.data.pets.map((pet) => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetSection pet={pet} />
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
			<div>
				{petsList}
			</div>
      
    </div>
  );
}

export default ThePets;
