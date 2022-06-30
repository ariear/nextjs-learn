export default (req,res) => {
    res.status(200).json({
        title: 'Bermain next js asik',
        desc: 'Nextjs bisa membuat SSR atau server side rendering yang bisa memungkinkan kita untuk seo friendly'
    })
}