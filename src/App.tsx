
type Status = 'To Do' | 'In Progress' | 'Done';

interface Task {
  id: string;
  title: string;
  deadline: string;
  status: Status;
}

const App = () => {
  return <>hello</>
}

export default App
