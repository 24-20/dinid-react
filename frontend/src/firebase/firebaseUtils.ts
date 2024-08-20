
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {db, imgdb} from './firebaseConfig'
import { getStorage, ref, deleteObject, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
import { ChangeEvent } from "react";
import { nanoid } from 'nanoid';

async function deleteImages(folder:string) {

    const storage = getStorage();
    // Create a reference under which you want to list
    const listRef = ref(storage, folder);

    // Find all the prefixes and items.
    listAll(listRef)
    .then((res) => {
        res.prefixes.forEach((folderRef) => {
        console.log(folderRef)
        });

        res.items.forEach((itemRef) => {
            deleteObject(itemRef).then(() => {
                    console.log('success')
                }).catch((error) => {
                console.error(error)
                });
        });
    }).catch((error) => {
        console.error(error)
    });

}

async function uploadImage(folder:string | undefined,e:ChangeEvent<HTMLInputElement> | undefined) {

    if (!e?.target?.files) return {error:true}
    const imgid = nanoid()

    const imgs = ref(imgdb,`${folder}/${imgid}`)
    const data = await uploadBytes(imgs,e.target.files[0])
    
    const imgURL = await getDownloadURL(data.ref)

       
    return {imgURL}

    

}


async function getUser (id:string) {
    //console.log(uid, updatedName)
    const docRef = doc(db, 'Users',id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {data:docSnap.data()}
    } else {
    // docSnap.data() will be undefined in this case
        return {error:'Ugyldig kode'}
    }
    
}
async function getDagenstall () {
    //console.log(uid, updatedName)
    const docRef = doc(db, 'public','dagensdata')
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {data:docSnap.data()}
    } else {
    // docSnap.data() will be undefined in this case
        return {error:'Ugyldig kode'}
    }
    
}
async function createUser () {
    function generateRandomCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const randomCode = generateRandomCode();

    const userref = collection(db, "Users");

    await setDoc(doc(userref, randomCode.toString()), {
        active:true
    });
    return randomCode.toString()
    
}
async function addDataUser (id:string,img:string,name:string,birthday:string) {
    

    const userref = collection(db, "Users");

    try {
        await setDoc(doc(userref, id), {
            img,
            name,
            birthday
        });
        return {}
    } catch (error) {
        return {error}
    }
    
}
export {getUser, createUser,getDagenstall,addDataUser, deleteImages, uploadImage}