import { render, screen, fireEvent, act } from '@testing-library/react'
import CheckinPage from '@/app/checkin/page'
import { useRouter } from 'next/navigation'
import * as mockApi from '@/lib/mockApi'

jest.useFakeTimers()

// Mock the validateBooking API
jest.mock('@/lib/mockApi', () => ({
    validateBooking: jest.fn()
}))

describe('CheckinPage', () => {
    it('renders checkin form and travel tips', () => {
        render(<CheckinPage />)

        // Header texts
        expect(screen.getByText('Online Check-in')).toBeInTheDocument()
        expect(screen.getByText('Retrieve Your Booking')).toBeInTheDocument()

        // Inputs
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Booking reference/i)).toBeInTheDocument()

        // Button
        expect(screen.getByRole('button', { name: /Retrieve Booking/i })).toBeInTheDocument()
    })

    it('disables submit button when form is incomplete, enables it when complete', () => {
        render(<CheckinPage />)

        const button = screen.getByRole('button', { name: /Retrieve Booking/i })
        const lastNameInput = screen.getByLabelText(/Last Name/i)
        const pnrInput = screen.getByLabelText(/Booking reference/i)

        // Initially disabled
        expect(button).toBeDisabled()

        // Partial input (only last name), still disabled
        fireEvent.change(lastNameInput, { target: { value: 'Smith' } })
        expect(button).toBeDisabled()

        // Both inputs filled, should be enabled
        fireEvent.change(pnrInput, { target: { value: 'ABC1234' } })
        expect(button).not.toBeDisabled()

        // Clear one, back to disabled
        fireEvent.change(lastNameInput, { target: { value: '' } })
        expect(button).toBeDisabled()
    })

    it('shows error when booking is not found', async () => {
        // Mock API responding with false (invalid)
        ; (mockApi.validateBooking as jest.Mock).mockResolvedValueOnce(false)

        render(<CheckinPage />)

        const lastNameInput = screen.getByLabelText(/Last Name/i)
        const pnrInput = screen.getByLabelText(/Booking reference/i)
        const button = screen.getByRole('button', { name: /Retrieve Booking/i })

        // Fill out form correctly but with wrong data
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
        fireEvent.change(pnrInput, { target: { value: 'WRONG' } })

        // Trigger submission
        fireEvent.click(button)

        expect(button).toBeDisabled()
        expect(screen.getByText(/Searching.../i)).toBeInTheDocument()

        await act(async () => {
            jest.runAllTimers()
            await Promise.resolve()
        })

        // Should display the error message now and button re-enables
        expect(screen.getByText('No booking found for the provided details. Please try again.')).toBeInTheDocument()
        expect(button).not.toBeDisabled()
        expect(screen.getByRole('button', { name: /Retrieve Booking/i })).toBeInTheDocument()
    })

    it('navigates to next page when booking is found', async () => {
        const mockPush = jest.fn()
            ; (useRouter as jest.Mock).mockReturnValue({ push: mockPush })

            // Mock API responding with true (valid)
            ; (mockApi.validateBooking as jest.Mock).mockResolvedValueOnce(true)

        render(<CheckinPage />)

        const lastNameInput = screen.getByLabelText(/Last Name/i)
        const pnrInput = screen.getByLabelText(/Booking reference/i)
        const button = screen.getByRole('button', { name: /Retrieve Booking/i })

        // Using valid mock data
        fireEvent.change(lastNameInput, { target: { value: 'Huum' } })
        fireEvent.change(pnrInput, { target: { value: 'ABC123' } })

        fireEvent.click(button)

        await act(async () => {
            jest.runAllTimers()
            await Promise.resolve()
        })

        expect(screen.queryByText('No booking found')).not.toBeInTheDocument()
        expect(mockPush).toHaveBeenCalledWith('/checkin/select-pax')
    })
})
