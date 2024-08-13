import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import AsideSec from "./AsideSec"
import Posts from "./Posts"
import UserDetail from "./UserDetail"
import axios from "axios"
import Navbar from "./Navbar"

const Feed = () => {
    const authLocal = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));

    const { _id, firstname, lastname, email, dateofBirth, location, occupation } = user;

    useEffect(() => {
        fetchFriendReq();
        fetchFriends();
        fetchPosts();
        if (user) {
            authLocal.login(user)
        }
    }, [])

    const [postImage, setPostImage] = useState()
    const [description, setDesc] = useState("")
    const postData = new FormData();

    postData.append("userId", _id);
    postData.append("firstname", firstname);
    postData.append("lastname", lastname);
    postData.append("location", location);
    postData.append("description", description);
    postData.append("postImage", postImage);

    const addPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/post", postData);
            const user = response.data;
            authLocal.login(user);
            alert("Post Added successfully");
            fetchPosts()
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const [postsData, setPostsData] = useState([])
    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:4000/post");
            setPostsData(res.data);
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    const [friendrequest, setFriendRequest] = useState([]);
    const fetchFriendReq = async () => {
        axios.get(`http://localhost:4000/friendrequest/${_id}`).then(res => {
            setFriendRequest(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const [friends, setFriends] = useState([])
    const fetchFriends = async () => {
        axios.get(`http://localhost:4000/friendrequest/friends/${_id}`)
            .then(res => {
                setFriends(res.data);
            }).catch(error => {
                console.log(error); // print the error
            });
    };

    const sendFriendReq = async (friendId) => {
        try {
            axios.post("http://localhost:4000/friendrequest", {
                requester: _id,
                recipient: friendId,
                status: 0
            }).then(res => {
                if (res.data.message) {
                    alert(res.data.message);
                } else {
                    console.log(res.data.data)
                    alert("Friend Request Send")
                }
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const confirmReq = async (id) => {
        axios.patch(`http://localhost:4000/friendrequest/${id}`, {
            status: 1
        }).then(res => {
            console.log(res.data)
            // setFriendRequest(res.data)
            fetchFriendReq()
            fetchFriends();
        }).catch(err => {
            console.log("ye error hai " + err)
        })
    }

    const delReq = async (id) => {
        axios.delete(`http://localhost:4000/friendrequest/${id}`)
            .then(response => {
                // handle success
                console.log(response.data);
                // setFriendRequest(response.data)
                fetchFriendReq()
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    return (
        <>
            <Navbar />
            <div className="lg:px-14 lg:mt-7 mt-5 w-fit">
                <div className="grid lg:grid-cols-4 gap-7 w-fit">
                    <UserDetail user={user} friends={friends} />
                    <Posts
                        user={user}
                        postsData={postsData}
                        setDesc={setDesc}
                        addPost={addPost}
                        setPostImage={setPostImage}
                        description={description}
                        sendFriendReq={sendFriendReq}
                    />
                    <AsideSec
                        friendrequest={friendrequest}
                        confirmReq={confirmReq}
                        delReq={delReq}
                    />
                </div>
            </div>
        </>
    )
}

export default Feed