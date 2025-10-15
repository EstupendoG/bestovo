import useSWR from 'swr'

// FETCH DO NOTION
// Fetch
const fetcher = (url) => fetch(url).then(res => res.json())

function useNotionApi(){
    // Fetch na rota api/notion
    const { data , error , isLoading } = useSWR('api/notion', fetcher)
    
    // Define "vídeos"
    const vids = data ? data.filter(d => (d.vidTags.some(tag => tag.name !== 'Clients'))) : []
    // Define "clientes"
    const clients = data ? data.filter(d => (d.vidTags.some(tag => tag.name == 'Clients'))) : []
    
    return {
        data,
        error,
        isLoading,
        vids,
        clients
    }
}

export default useNotionApi