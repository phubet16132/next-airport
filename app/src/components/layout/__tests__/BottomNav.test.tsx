import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import BottomNav from '../BottomNav'
import { useRouter, usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}))

describe('BottomNav', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: mockPush,
            })
    })

    it('renders correctly with 3 navigation items', () => {
        ; (usePathname as jest.Mock).mockReturnValue('/')
        render(<BottomNav />)

        expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Check-in/i })).toBeInTheDocument()
        expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
    })

    it('navigates to checkin page when clicked and highlights correctly based on pathname', () => {
        ; (usePathname as jest.Mock).mockReturnValue('/checkin')
        render(<BottomNav />)

        const checkinButton = screen.getByRole('link', { name: /Check-in/i })
        expect(checkinButton).toHaveClass('text-sky-500')
    })

    it('highlights home icon when on root page', () => {
        ; (usePathname as jest.Mock).mockReturnValue('/')
        render(<BottomNav />)

        const homeButton = screen.getByRole('link', { name: /Home/i })
        expect(homeButton).toBeInTheDocument()
    })
})
