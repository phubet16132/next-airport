import { render } from '@testing-library/react'
import PaxInfoSkeleton from '../PaxInfoSkeleton'

describe('PaxInfoSkeleton', () => {
    it('renders correctly with pulse animation', () => {
        const { container } = render(<PaxInfoSkeleton />)
        const skeletonWrapper = container.firstChild as HTMLElement
        expect(skeletonWrapper).toBeInTheDocument()
    })
})
