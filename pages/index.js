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
    const resUser = await fetch('https://api.github.com/users/ReinaldoJuunior')
    const user = await resUser.json()

    const resRepos = await fetch('https://api.github.com/users/ReinaldoJuunior/repos?sort=updated')
    const originalRepos = await resRepos.json()

    const dontShowRepos = ['ReinaldoJuunior/link-in-bio']

    const isNotFork = repo => !repo.fork
    const dontShowFilter = repo => dontShowRepos.indexOf(repo.full_name) === -1

    const extractData = repo => ({
        id: repo.id,
        full_name: repo.full_name,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        description: repo.description

    })

    const repos = originalRepos
                            .filter(isNotFork)
                            .filter(dontShowFilter)

    return {
        props: {
            currentData: new Date().toString(),
            repos
        }
    }

}
export default Index