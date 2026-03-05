import { render } from '@testing-library/react'
import PaxInfoSkeleton from '../PaxInfoSkeleton'

describe('PaxInfoSkeleton', () => {
    it('renders correctly with pulse animation', () => {
        const { container } = render(<PaxInfoSkeleton />)
        const skeletonWrapper = container.firstChild as HTMLElement
        expect(skeletonWrapper).toHaveClass('animate-pulse')
        expect(skeletonWrapper.querySelectorAll('.border-slate-200.rounded-lg')).toHaveLength(2)
    })
})
