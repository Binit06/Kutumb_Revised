interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section : React.FC<SectionProps> = ({
    title,
    children,
}) => {
    return(
        <div className="bg-white rounded-[7px] pb-3 border-2">
            <h1 className="text-black text-md font-semibold select-none px-8 py-3 border-b-2 border-black border-opacity-20">
                {title}
            </h1>
            {children}
        </div>
    )
}

export default Section;