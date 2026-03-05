import { render, screen, fireEvent, act } from '@testing-library/react'
import BoardingPassPage from '@/app/checkin/boarding-pass/page'
import { useRouter } from 'next/navigation'

jest.useFakeTimers()

describe('BoardingPassPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: mockPush,
                back: jest.fn()
            })
    })

    it('initially renders the skeleton loader', () => {
        const { container } = render(<BoardingPassPage />)
        expect(container.firstChild).toBeInTheDocument()

        const doneBtn = screen.getByRole('button', { name: /Done/i })
        expect(doneBtn).toBeDisabled()
    })

    it('renders the boarding passes after loading', async () => {
        render(<BoardingPassPage />)

        await act(async () => {
            jest.advanceTimersByTime(2000)
        })

        // Removed non-existent heading text query
        // Check that passengers from mock data rendered
        expect(screen.getByText('ALEX HUUM')).toBeInTheDocument()
        expect(screen.getByText('Somsee Kuum')).toBeInTheDocument()

        const doneBtn = screen.getByRole('button', { name: /Done/i })
        expect(doneBtn).not.toBeDisabled()

        // Complete flow navigating back to home
        fireEvent.click(doneBtn)
        expect(mockPush).toHaveBeenCalledWith('/checkin')
    })
})
