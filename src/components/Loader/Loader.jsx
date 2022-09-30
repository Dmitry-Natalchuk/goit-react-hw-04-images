import { Dna } from  'react-loader-spinner'


export const Loader = () => {
    return (
        <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            wrapperClass="dna-wrapper"
        />
    )
}