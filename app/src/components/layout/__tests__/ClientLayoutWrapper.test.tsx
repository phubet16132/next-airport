import { render, screen } from '@testing-library/react'
import ClientLayoutWrapper from '../ClientLayoutWrapper'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}))

describe('ClientLayoutWrapper', () => {
    it('renders children and navs on a standard page', () => {
        ; (usePathname as jest.Mock).mockReturnValue('/')
        render(
            <ClientLayoutWrapper>
                <div data-testid="child">Content</div>
            </ClientLayoutWrapper>
        )

        expect(screen.getByTestId('child')).toBeInTheDocument()
        // Verify Header or Nav is shown (Header says "Qoomlee")
        expect(screen.getByText('Qoomlee')).toBeInTheDocument()
        // Verify BottomNav is shown
        const homeLinks = screen.getAllByRole('link', { name: 'Home' })
        expect(homeLinks.length).toBeGreaterThan(0)
    })

    it('hides header and BottomNav on deep check-in flow pages', () => {
        ; (usePathname as jest.Mock).mockReturnValue('/checkin/select-pax')
        render(
            <ClientLayoutWrapper>
                <div data-testid="child">Content</div>
            </ClientLayoutWrapper>
        )

        expect(screen.getByTestId('child')).toBeInTheDocument()

        // Header specific to root should not be rendering the branding text in the root header layout, 
        // actually our test depends if Header is hidden
        expect(screen.queryByText('Qoomlee')).not.toBeInTheDocument()
        // BottomNav specific content shouldn't exist
        expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
    })
})
