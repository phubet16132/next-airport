import { render, screen, fireEvent, act } from '@testing-library/react'
import SelectPaxPage from '@/app/checkin/select-pax/page'
import { useRouter } from 'next/navigation'

jest.useFakeTimers()

describe('SelectPaxPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: mockPush,
                back: jest.fn()
            })
    })

    it('initially renders the skeleton loader', () => {
        const { container } = render(<SelectPaxPage />)
        // A quick way to test if skeleton is there
        expect(container.querySelector('.animate-pulse')).toBeInTheDocument()

        // Continue should be disabled while loading
        const continueBtns = screen.getAllByRole('button', { name: /Continue/i })
        expect(continueBtns[continueBtns.length - 1]).toBeDisabled()
    })

    it('renders passenger list after loading and handles selection correctly', () => {
        render(<SelectPaxPage />)

        // Fast-forward 1 second loading time
        act(() => {
            jest.advanceTimersByTime(1000)
        })

        // Skeleton should be gone, content is here
        expect(screen.getByRole('heading', { name: 'Select Passengers' })).toBeInTheDocument()
        expect(screen.getByText('ALEX HUUM')).toBeInTheDocument()
        expect(screen.getByText('Somsee Kuum')).toBeInTheDocument()

        // Alex HUMM is selected by default, so 'Continue' should be enabled
        const continueBtns = screen.getAllByRole('button', { name: /Continue/i })
        const mainContinueBtn = continueBtns[continueBtns.length - 1]
        expect(mainContinueBtn).not.toBeDisabled()

        // Deselect Alex HUUM
        fireEvent.click(screen.getByText('ALEX HUUM').closest('.cursor-pointer')!)

        // No one selected now, continue should be disabled
        expect(mainContinueBtn).toBeDisabled()

        // Select all button toggles selection
        const selectAllBtn = screen.getByRole('button', { name: /Select All/i })
        fireEvent.click(selectAllBtn)

        // Now everyone should be selected and continue enabled
        expect(mainContinueBtn).not.toBeDisabled()

        // Navigate next
        fireEvent.click(mainContinueBtn)
        expect(mockPush).toHaveBeenCalledWith('/checkin/pax-info')
    })
})
