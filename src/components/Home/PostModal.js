import { useState } from "react";
import ReactPlayer from "react-player";
import {connect} from 'react-redux';
import { postArticleAPI } from "../../actions";
import 'firebase/compat/firestore';
import {storage} from '../../firebase';
import {
    Container,
    Content,
    Header,
    ShareContent,
    UserInfo,
    ShareCreation,
    AssetButton,
    AttachAssets,
    PostButton,
    Editor,
    UploadImage,
    UploadVideo
  } from "./StylePostModal";
  



const PostModal = (props) => {
    const [editorText,setEditorText]=useState("");
    const [shareImage,setShareImage]=useState("");
    
    const [assetArea,setAssetArea]=useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const handleChange=(e)=>{
        const image=e.target.files[0];

        if(image=== '' ||image ===undefined){
            alert(`not an image,the file is a ${typeof(image)}`);
            return;
        }
        setShareImage(image);
    };
    const handleVideo = (event) => {
        const selectedFile = event.target.files[0];
        const storageRef = storage.ref();
        const videoRef = storageRef.child(`videos/${selectedFile.name}`);
    
        videoRef.put(selectedFile).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setVideoUrl(downloadURL);
            console.log('Download URL:', downloadURL);
          });
        }).catch((error) => {
          console.error('Error uploading video:', error);
        });
      };
    
    const switchAssetArea=(area)=>{
        setShareImage("");
        setVideoUrl("");
        setAssetArea(area);
    };
    const postArticle=(e)=>{
        console.log('post malone:r');
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        const payload={
            image:shareImage,
            video:videoUrl,
            user:props.user,
            description:editorText,
            timestamp : Date.now(),
        };
        props.postArticle(payload);
        reset(e);
    };

    const reset=(e)=>{
        setEditorText("");
        setShareImage("");
        setVideoUrl("");
        setAssetArea("");
        props.handleClick(e);
        props.handlePost(e);
    };

    return (  
        <>
        {props.showModal==='open' &&
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(event)=>reset(event)}>
                        <img src="/images/close-icon.svg" alt=""/>
                    </button>
                </Header>
                <ShareContent>
                    <UserInfo>
                        {props.user.photoURL ? (<img src={props.user.photoURL} alt=""/>)
                        :(<img src="/images/user.svg" alt=""/>)
                        }
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                    <textarea 
                    value={editorText}
                    onChange={(e)=>setEditorText(e.target.value)}
                    placeholder="what do you want to talk about?"
                    autoFocus={true} 
                    />

{ assetArea==='image' ?

<UploadImage>
    <input type="file" 
    accept='image/gif ,image/jpeg ,image/png'
    name="image"
    id="file"
    style={{display:"none"}}
    onChange={handleChange} 
    />
    <p>
        <label htmlFor="file">
        Select an image to share</label>
    </p>
    {shareImage && <img src={URL.createObjectURL(shareImage)} alt=""/>}
    </UploadImage>
    :
    assetArea==='media' &&
    <UploadVideo>
    <input 
    type="file" 
    name="media"
    id="file"
    style={{display:"none"}}
    onChange={handleVideo}
    />
    <p>
        <label htmlFor="file" >
             Select a video to share
        </label>
    </p>
    {videoUrl && (
    <ReactPlayer  width={'100%'}  height={'100%'} url={videoUrl} controls={true} playsinline/>
    )}
    </UploadVideo>
}
                    
                    </Editor>
                </ShareContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={()=>switchAssetArea("image")}>
                            <img src="/images/photo-icon.svg" className="postimg" alt=""/>
                        </AssetButton>
                        <AssetButton onClick={()=>switchAssetArea("media")}>
                            <img src="/images/video-icon.svg" className="postvid" alt=""/>
                        </AssetButton>
                    </AttachAssets>
                    <PostButton disabled={!editorText ? true : false} 
                    onClick={(event)=>postArticle(event)}
                    >
                        Post
                    </PostButton>

                </ShareCreation>
            </Content>
        </Container>
}
        </>
    );
}

const mapStateToProps=(state)=>{
    return{
        user:state.userState.user,
    }
};

const mapDispatchToProps=(dispatch)=>({
    postArticle:(payload)=>dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps,mapDispatchToProps)(PostModal);
