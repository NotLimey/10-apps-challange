import React, {useState } from 'react'
import '../scss/github.scss'

const GithubProfiles = () => {
    const [User, setUser] = useState();
    const [Username, setUsername] = useState("notlimey");

    // useEffect(() => {
    //     // 
    //         var obj = { 
    //             avatar_url: 'https://avatars.githubusercontent.com/u/70258183?v=4',
    //             login: 'notlimey',
    //             name: 'Martin Myhre',
    //             company: 'limeyfy',
    //             blog: 'https://limeyfy.no',
    //             location: 'Norway',
    //             twitter_username: 'lim3y_official',
    //             bio: 'Software engineer and owner / Founder of Limeyfy',

    //         }
    //         setUser(obj);

    //         console.log(User)
    // }, [Username])

    const fetchApi = async () => {
        fetch(`https://api.github.com/users/${Username}`)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                throw res;
            })
            .then(data => {
                setUser(data);
            })
            .then(() => {
                console.log(User)
            })
            .catch(error => {
                console.error("Error fetching data")
            })
    }

    return (
       <section className="github">
            <div className="github-search">
                <ion-icon name="logo-github"></ion-icon>
                <h1>Search github user</h1>
                <div className="search-user">
                    <input placeholder="Username.." onChange={e => setUsername(e.target.value)} />
                    <button onClick={fetchApi}><ion-icon name="search-outline"></ion-icon></button>
                </div>
            </div>
            {User !== undefined && User !== null ?
            <div>
                <div className="github-basic-info-img">
                    <div className="github-img">
                        <img src={User.avatar_url} alt="" />
                    </div>
                    <div className="github-basic-info">
                        <div>
                            <h3 className="g-login">{User.login} ({User.id})</h3>
                            <h3 className="g-name">{User.name}</h3>
                            <h3 className="g-company"><ion-icon name="home-outline"></ion-icon>{User.company}</h3>
                        </div>
                        <div>
                            <h3 className="g-blog"><a href={User.blog}>{User.blog}</a></h3>
                            <h3 className="g-location"><ion-icon name="pin-outline"></ion-icon> <span>{User.location}</span></h3>
                            <h3 className="g-twitter"><ion-icon name="logo-twitter"></ion-icon> <span>{User.twitter_username}</span></h3>
                        </div>
                    </div>
                </div>
            </div>
            : <></>}
       </section>
    )
}

export default GithubProfiles;