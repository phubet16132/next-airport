import Home from '../page'
import { redirect } from 'next/navigation'

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

describe('Home Page', () => {
    it('redirects to /checkin', () => {
        // Next.js redirect function throws an error to stop execution
        ; (redirect as unknown as jest.Mock).mockImplementation(() => {
            throw new Error('NEXT_REDIRECT')
        })

        expect(() => Home()).toThrow('NEXT_REDIRECT')
        expect(redirect).toHaveBeenCalledWith('/checkin')
    })
})
