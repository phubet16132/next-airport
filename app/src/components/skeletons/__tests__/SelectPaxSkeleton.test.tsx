import { render } from '@testing-library/react'
import SelectPaxSkeleton from '../SelectPaxSkeleton'

describe('SelectPaxSkeleton', () => {
    it('renders correctly with pulse animation', () => {
        const { container } = render(<SelectPaxSkeleton />)
        const skeletonWrapper = container.firstChild as HTMLElement
        expect(skeletonWrapper).toHaveClass('animate-pulse')
        expect(skeletonWrapper.querySelectorAll('.border-2')).toHaveLength(2)
    })
})
