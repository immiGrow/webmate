import Image from 'next/image'
import Link from 'next/link';
import Navbar from '../../Components/Navbar'
import baseUrl from '../../mongodb/baseUrl'
import styles from "../../styles/Home.module.css";
const Post = ({product}) => {
  const  fileDownloadHandler = async (pictureUrl,name,owner) => {
        console.log(pictureUrl)
        const response = await fetch(pictureUrl);
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${name}-${owner}`;
            a.click();
        })
    };
  return(
      <>
      <Navbar/>
      <div className={styles.sudden}>
        
    <h2>Say Thanks to -<span className={styles.tag}>{product.owner}</span></h2>
    <strong>Beautiful name of Image is <span className={styles.tag}>{product.imagename}</span></strong>
     <Image src={product.imageUrl} height={500} width={1000} alt="Nothing"/>
    <button className={styles.hidden} onClick={fileDownloadHandler(product.imageUrl,product.imagename,product.owner)}>Download</button>
     </div>
      </>
  )


}
export async function getServerSideProps({params:{id}}) {
    const response=await fetch(`${baseUrl}/api/collection/${id}`)
    const data= await response.json()
    console.log(data)
    return {
      props: {
          product:data
      }
    }
  }

export default Post;
