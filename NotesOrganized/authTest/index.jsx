function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}