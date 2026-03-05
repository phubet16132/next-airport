import { render, screen, fireEvent, act } from '@testing-library/react'
import PaxInfoPage from '@/app/checkin/pax-info/page'
import { useRouter } from 'next/navigation'

jest.useFakeTimers()

describe('PaxInfoPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: mockPush,
                back: jest.fn()
            })
    })

    it('initially renders the skeleton loader', () => {
        const { container } = render(<PaxInfoPage />)
        expect(container.querySelector('.animate-pulse')).toBeInTheDocument()

        const continueBtn = screen.getByRole('button', { name: /Continue/i })
        expect(continueBtn).toBeDisabled()
    })

    it('renders form inputs after loading and allows navigation', () => {
        render(<PaxInfoPage />)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        expect(screen.getByRole('heading', { name: 'Passenger Details' })).toBeInTheDocument()

        // Passengers should be rendered
        expect(screen.getByText('1. ALEX HUUM')).toBeInTheDocument()
        expect(screen.getByText('2. Somsee Kuum')).toBeInTheDocument()

        // Check specific inputs via default values
        const phoneInputs = screen.getAllByRole('textbox')
        expect(phoneInputs[0]).toHaveValue('811234567')

        // Navigate next
        // Get the second Continue button (the one in the footer)
        const continueBtns = screen.getAllByRole('button', { name: /Continue/i })
        const submitBtn = continueBtns[continueBtns.length - 1]
        expect(submitBtn).not.toBeDisabled()
        fireEvent.click(submitBtn)
        expect(mockPush).toHaveBeenCalledWith('/checkin/dangerous-goods')
    })
})
