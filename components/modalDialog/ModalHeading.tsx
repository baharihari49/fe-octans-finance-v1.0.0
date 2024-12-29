
interface ModalHeadingProps {
    children: React.ReactNode
}

export const ModalHeading:React.FC<ModalHeadingProps> = ({
    children
}) => {
    return (
        <>
           {children}
        </>
    )
}