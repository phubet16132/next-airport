import { render, screen, fireEvent, act } from '@testing-library/react'
import DangerousGoodsPage from '@/app/checkin/dangerous-goods/page'
import { useRouter } from 'next/navigation'

jest.useFakeTimers()

describe('DangerousGoodsPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: mockPush,
                back: jest.fn()
            })
    })

    it('initially renders the skeleton loader', () => {
        const { container } = render(<DangerousGoodsPage />)
        expect(container.querySelector('.animate-pulse')).toBeInTheDocument()

        const continueBtn = screen.getByRole('button', { name: /Accept & Continue/i })
        expect(continueBtn).toBeDisabled()
    })

    it('renders declaration texts after loading and allows continue', () => {
        render(<DangerousGoodsPage />)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        expect(screen.getByRole('heading', { name: 'Dangerous Goods Declaration' })).toBeInTheDocument()

        // Check some specific prohibited items
        expect(screen.getByText(/Explosives/i)).toBeInTheDocument()
        expect(screen.getByText(/Flammable Items/i)).toBeInTheDocument()

        const continueBtn = screen.getByRole('button', { name: /Accept & Continue/i })
        expect(continueBtn).not.toBeDisabled()

        // Navigate next
        fireEvent.click(continueBtn)
        expect(mockPush).toHaveBeenCalledWith('/checkin/boarding-pass')
    })
})
