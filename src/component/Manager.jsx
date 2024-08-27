
import { useRef, useState, useEffect } from 'react';
import {v4 as uuidv4 } from 'uuid';

function Manager() {
  const ref = useRef();
  const passref = useRef();
  const [form, setForm] = useState({ site: '', username: '', pass: '' });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem('passwords');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPass = () => {
    console.log(ref.current.src);
    if (ref.current.src.includes('hideeye.png')) {
      ref.current.src = '../src/assets/VisEye.png';
      passref.current.type = "text";
    } else {
      ref.current.src = '../src/assets/hideeye.png';
      passref.current.type = "password";
    }
  };

  const savePass = () => {
    if(form.site.length>3 && form.username.length>3 && form.pass.length>3){
      

    const updatedPasswordArray = [...passwordArray, {...form, id:uuidv4()}];
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswordArray));
    
  
  }
    else alert("password not saved")
  };
  const deletePass=(id)=>{
    
        setPasswordArray(passwordArray.filter(item=>item.id!=id));
        localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)));
        
  }
  const editPass=(id)=>{
    setForm(passwordArray.filter(item=>item.id===id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
       
    localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)));
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    
  }

  return (
    <>
   
      <div className="py-3 mt-8 flex justify-center items-center w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl text-center">
            <span className="text-green-700">&lt;</span>ManagePass<span className="text-green-700">/&gt;</span>
          </h1>
          <p className="text-green-700 text-lg text-center">Your Own Password Manager</p>
          <div className="rounded-full my-4">
            <input
              name="site"
              value={form.site}
              onChange={handleChange}
              placeholder="Enter Website Url"
              className="border border-green-700 w-full rounded-full px-3 py-2"
              type="text"
            />
            <div className="flex gap-3 py-2 w-full">
              <input
                onChange={handleChange}
                name="username"
                value={form.username}
                placeholder="Enter UserName"
                className="px-3 py-2 w-full border border-green-700 rounded-full"
                type="text"
              />
              <div className="relative w-full">
                <input
                  ref={passref}
                  type="password"
                  onChange={handleChange}
                  name="pass"
                  value={form.pass}
                  placeholder="Enter Password"
                  className="border border-green-700 rounded-full px-3 py-2 w-full"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={showPass}
                >
                  <img ref={ref} width={20} src="../src/assets/hideeye.png" alt="Toggle visibility" />
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={savePass}
                className="flex w-fit justify-center items-center bg-green-400 hover:bg-green-500 font-bold rounded-full px-4 py-2"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/zrkkrrpl.json"
                  trigger="hover"
                  className="w-6 h-6 px-2"
                ></lord-icon>
                <p>Save Password</p>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <table className="table-auto w-full ">
              <thead>
                <tr className="bg-green-300">
                  <th className="py-2 px-4">Url</th>
                  <th className="py-2 px-4">UserName</th>
                  <th className="py-2 px-4">Pass</th>
                  <th className="py-2 px-4">Actions </th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border border-white">
                      <div className="flex justify-between items-center">
                        <a href={item.site}>{item.site}</a>
                        <img
                          onClick={() => copyText(item.site)}
                          src="../src/assets/copy-icon.png"
                          className="w-5 h-5"
                          alt="Copy icon"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-white">
                      <div className="flex justify-between items-center">
                        {item.username}
                        <img
                          onClick={() => copyText(item.username)}
                          src="../src/assets/copy-icon.png"
                          className="w-5 h-5"
                          alt="Copy icon"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-white">
                      <div className="flex justify-between items-center">
                        <span>{item.pass}</span>
                        <img
                          onClick={() => copyText(item.pass)}
                          src="../src/assets/copy-icon.png"
                          className="w-5 h-5"
                          alt="Copy icon"
                        />
                      </div>
                    </td>
                    <td className="flex justify-center items-center px-3 py-2 gap-2">
                    <lord-icon onClick={()=>{editPass(item.id)}}
      src="https://cdn.lordicon.com/wuvorxbv.json"
      trigger="hover"
      stroke="bold"
      colors="primary:#242424,secondary:#08a88a"
      style={{ width: '25px', height: '25px',margin:'2px' }}
      
    ></lord-icon>
                    <lord-icon onClick={()=>{deletePass(item.id)}}
      src="https://cdn.lordicon.com/drxwpfop.json"
      trigger="hover"
      stroke="bold"
      colors="primary:#242424,secondary:#08a88a"
      style={{ width: '25px', height: '25px' ,margin:'2px' }}
      
    ></lord-icon>
   
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager;



