import React from 'react'
import getUser from '../utils/getUser'

const Index = ( {repos, user} ) => {
    return(
        <div className='container mx-auto'>
            <h1 className='text-5xl'>Olá, eu sou o Reinaldo Tolentino </h1>
            <br/>
            <h2 className='font-bold text-2xl'>Meus repositórios no Github</h2>

            {repos.map(repo => {
                return (
                    <div key={repo.id} className='rounded bg-gray-200 mx-8 my-4 p-6 hover:shadow-md'>
                        <h3 className='font-bold'>{repo.full_name}</h3>
                        <p>Language: {repo.language} / Stars: {repo.stargazers_count}</p>
                        <p>Descrição: {repo.description}</p>
                    </div>
                )
            })}
        </div>
    )
}
export async function getServerSideProps(context) {
    const { repos, user } = await getUser("ReinaldoJuunior")
    return {
        props: {
            currentData: new Date().toString(),
            repos,
            user
        }
    }

}
export default Index