jest.mock('node-fetch', () => jest.fn())

import { FetchHttpClient } from "./fetch-http-client"
import fetch from 'node-fetch';

const mockedFetch = fetch as unknown as jest.Mock;

describe('FetchHttpClient', () => {
  const url = 'localhost'

  let fetchHttpClient: FetchHttpClient

  beforeEach(() => {
    fetchHttpClient = new FetchHttpClient(url)
  })

  describe('get', () => {
    it('returns the json from the fetch response', async () => {
      const expected = { foo: 'bar' }
      mockedFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(expected),
        ok: true
      })
      const response = await fetchHttpClient.get('foo')
      expect(response).toEqual(expected)
    })
  })
})
