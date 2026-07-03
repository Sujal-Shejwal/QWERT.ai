import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArtical from './pages/WriteArtical'
import BlogTitles from './pages/BlogTitles'
import GenerateImg from './pages/Generateimg'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import React, { useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";


const App = () => {

   const {getToken} = useAuth();
   useEffect(()=>{
   getToken().then((token)=>console.log(token));
   },[getToken])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
           <Route path='write-article' element={<WriteArtical />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-images' element={<GenerateImg />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App