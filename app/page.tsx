import './app.css'
import HomeGrid from './components/ui/HomeGrid/HomeGrid'
import Sidebar from './components/ui/Sidebar/Sidebar'

export default function HomePage(){
    return (<div className="flex bg-gray-600">
        <Sidebar></Sidebar>
        <HomeGrid></HomeGrid>
    </div>)
}