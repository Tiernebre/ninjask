import { useCallback, useState } from "react"
import { useParams } from "react-router";
import { useDidMount } from "rooks";
import { HttpDraftService } from "../api/draft/HttpDraftService";
import { HttpClient } from "../api/http"
import { Pokemon } from "../api/pokemon/Pokemon";

type DraftPoolViewParams = {
  draftId: string
}

type DraftPoolViewProps = {
  httpClient: HttpClient
}

export const DraftPoolView = ({ httpClient }: DraftPoolViewProps) => {
  const { draftId } = useParams<DraftPoolViewParams>()
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  const fetchPokemon = useCallback(async () => {
    const draftService = new HttpDraftService(httpClient)
    setPokemon(await draftService.getPoolForOneWithId(Number(draftId)))
  }, [httpClient, draftId])

  useDidMount(() => {
    fetchPokemon()
  })

  return (
    <div>
      Draft Pool.
    </div>
  )
}