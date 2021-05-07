import { act, render, screen } from '@testing-library/react'
import { Draft } from '../../api/draft/Draft'
import { LiveDraftPoolView } from './LiveDraftPoolView'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { LiveDraftPool } from '../../api/draft/LiveDraftPool'

jest.mock('react-use-websocket', () => ({
  __esModule: true,
  default: jest.fn(),
  ReadyState: {
    UNINSTANTIATED:-1,
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  }
}))

const mockedUseWebsocket = useWebSocket as jest.Mock;

beforeEach(() => {
  mockedUseWebsocket.mockReset()
})

it.each([ReadyState.UNINSTANTIATED, ReadyState.CONNECTING, ReadyState.CLOSING, ReadyState.CLOSED])('displays a loading message if web socket status is %p', async (status: ReadyState) => {
  const draft: Draft = {
    id: 1,
    poolSize: 2,
    livePoolingHasFinished: false
  }
  const challengeOwnerId = 1
  mockedUseWebsocket.mockReturnValue({
    readyState: status
  })
  await act(async () => {
    render(<LiveDraftPoolView draft={draft} challengeOwnerId={challengeOwnerId} onFinished={jest.fn()}/>)
  })
  expect(screen.getByText('Loading Live Draft...')).toBeInTheDocument()
})

it('displays a draft that is gotten from a live feed', async () => {
  const draft: Draft = {
    id: 1,
    poolSize: 2,
    livePoolingHasFinished: false
  }
  const draftStatus: LiveDraftPool = {
    draftId: draft.id,
    currentPokemon: null,
    currentIndex: -1,
    pooledPokemon: [],
    isPoolOver: false
  }
  const challengeOwnerId = 1
  mockedUseWebsocket.mockReturnValue({
    readyState: ReadyState.OPEN,
    lastMessage: {
      data: JSON.stringify(draftStatus)
    }
  })
  await act(async () => {
    render(<LiveDraftPoolView draft={draft} challengeOwnerId={challengeOwnerId} onFinished={jest.fn()}/>)
  })
  expect(screen.getByText('The Pool is being loaded...')).toBeInTheDocument()
})