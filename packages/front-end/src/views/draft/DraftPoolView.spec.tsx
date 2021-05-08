import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { object, when } from "testdouble";
import { DraftService } from "../../api/draft/DraftService";
import { Pokemon } from "../../api/pokemon";
import { DraftPoolView } from "./DraftPoolView";

it("displays each of the pokemon in a draft pool", async () => {
  const draftId = 1;
  const draftService = object<DraftService>();
  const pokemon: Pokemon[] = [
    {
      id: 1,
      name: "Bulbasaur",
      imageUrls: {
        thumbnail: "",
        icon: "",
        image: "",
      },
    },
    {
      id: 2,
      name: "Pikachu",
      imageUrls: {
        thumbnail: "",
        icon: "",
        image: "",
      },
    },
  ];
  when(draftService.getPoolForOneWithId(draftId)).thenResolve(pokemon);
  await act(async () => {
    await render(
      <DraftPoolView
        draftId={draftId}
        draftService={draftService}
        challengeName={"Test Challenge"}
      />
    );
  });
  pokemon.forEach((individualPokemon) => {
    expect(screen.getByText(individualPokemon.name)).toBeInTheDocument();
  });
});

it("displays a subtitle based upon the given challenge name", async () => {
  const draftId = 1;
  const draftService = object<DraftService>();
  const challengeName = "Test Challenge";
  const pokemon: Pokemon[] = [
    {
      id: 1,
      name: "Bulbasaur",
      imageUrls: {
        thumbnail: "",
        icon: "",
        image: "",
      },
    },
    {
      id: 2,
      name: "Pikachu",
      imageUrls: {
        thumbnail: "",
        icon: "",
        image: "",
      },
    },
  ];
  when(draftService.getPoolForOneWithId(draftId)).thenResolve(pokemon);
  await act(async () => {
    await render(
      <DraftPoolView
        draftId={draftId}
        draftService={draftService}
        challengeName={challengeName}
      />
    );
  });
  const subtitle = screen.getByRole("doc-subtitle");
  expect(subtitle).toBeInTheDocument();
  expect(subtitle).toHaveTextContent(
    `Below are the pokemon that are pooled for ${challengeName}.`
  );
});
