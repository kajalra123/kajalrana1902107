import React,{useState,useEffect} from 'react';
import { paginate ,makearray,sorting} from "../utilss";
import Swal from 'sweetalert2';
var alluser=[];

export default function Student3() {
        let [users,setUser]=useState([]);
        const[pagesize,setpagesize]=useState(30);
        const [currentpage,setcurrentpage]=useState(0);
        const [sortcolum,setsortcolum]=useState("id");
        const [sortorder,setsortorder]=useState("asc");
        let data=paginate(users,currentpage,pagesize);
        data = data.length && sorting(data, sortcolum, sortorder);
        let totallink=Math.ceil(users.length/pagesize);
    let linksarray=makearray(totallink);
    console.log(linksarray);


        useEffect(() =>{
            async function getstudent(){
                       let result= await fetch("https://60f83712ee56ef0017975801.mockapi.io/student",);
                       let data=await result.json();
                       setUser(data);
                       alluser=data;
            }
            getstudent();
            console.log(users);
        },[]);
        const handlePageChange=(linkno)=>{
            setcurrentpage(linkno);
            if(linkno==='previous') setcurrentpage(currentpage-1);
            if(linkno==='next') setcurrentpage(currentpage+1);
        };
        const Handlesort=(key)=>{
            setsortcolum(key);
            setsortorder(sortorder==='asc'?'desc':'asc')
        }
        const handlesearch=(e)=>{
            let searchkeywords=e.target.value.toLowerCase();

            let filtered=alluser.filter((user)=>{
                let a=user.student_name.toLowerCase();
                return a.startsWith(searchkeywords);

            });
            setUser(filtered);

        };
        const handlefiltering=(e)=>{
            let filtered=alluser.filter((users) => users.isverify===e.target.checked);

    
        setUser(filtered)
        }
    
        const handledelete=(id)=>{
      
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
               
                if (result.isConfirmed) {
                    deleteuser(id)
                  
                }
              })
            async function deleteuser(){
                let result=await fetch(`https://60f83712ee56ef0017975801.mockapi.io/student/${id}`,
                {
                    method:"DELETE"
                },
                );
               
                if(result.status==200){
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.'
    
                    )
                    
                   
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'something went wrong',
                    showConfirmButton: false,
                    timer: 1500
                  })
    
            }
        }
    
            };
      
    return (
        <div>
            <div className="mb-3  mt-5 search-bar rounded ">
  <input  onKeyUp={handlesearch} type="email" className="form-control form" id="exampleFormControlInput1" placeholder="Search Here......"/>
</div>
<div class="table-wrapper shadow p-3">
        
            <table className="table m-table">
            <thead>
                
        
                <th onClick={()=>Handlesort("student_name")}>Student_name</th>
                <th >ID</th>
                <th>rollno</th>
                <th  onClick={()=>Handlesort("email")}>email</th>
                <th>profile picture</th>
                <th>marks</th>
                <th onClick={()=>Handlesort("age")}>Age</th>
                <th>{""}Verification{""}<input onClick={handlefiltering}  class="ml-4"type="checkbox"/></th>

            </thead>
            <tbody>
            {data.length && data.map((user) =>(
                <tr key={user.ID}>

                    <td>{user.student_name}</td>
                    <td>{user.id}</td>
                    <td>{user.rollno}</td>
                    <td>{user.email}</td>
                    <td><img  className="profile-picture"src={user.pp} alt=""/></td>
                    <td>{user.marks}</td>
                    <td>{user.age}</td>
                    <td>{user.isverify? "verified":"not verifed"}</td>
                    <td><button onClick={()=>handledelete(user.id)} className="btn btn-danger"> DELETE</button></td>
                    
                    

                </tr>
                     ))}
                    
            </tbody>
        </table>
        </div>
        <div className="pagination-block">
        <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li  onClick={()=> handlePageChange('previous')}class="page-item ">
      <a class="page-link" href="#" tabindex="-1">Previous</a>
    </li>
  
      {
  linksarray.map((link)=>(
            <li onClick={()=> handlePageChange(link)} className={`page-item ${currentpage===link && "active"}`} >
                <a className="page-link"
                href="#">{link+1}</a></li>
  ))}
    <li onClick={()=> handlePageChange('next')} class="page-item ">
      <a class="page-link" href="#" tabindex="-1">next</a>
    </li>
  </ul>
</nav>

        </div>
            
           
            
        
            </div>
        );
            
  }
