import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale/en-GB';

import Home from './components/Home';
import ProfileList from './components/profile/ProfileList';
import CreateProfileForm from './components/profile/CreateProfileForm';
import UpdateProfileForm from './components/profile/UpdateProfileForm';
import WorkExperienceList from './components/work_experience/WorkExperienceList';
import CreateWorkExperienceForm from './components/work_experience/CreateWorkExperienceForm';
import UpdateWorkExperienceForm from './components/work_experience/UpdateWorkExperienceForm';
import EducationList from './components/education/EducationList';
import CreateEducationForm from './components/education/CreateEducationForm';
import UpdateEducationForm from './components/education/UpdateEducationForm';
import SkillList from './components/skill/SkillList';
import CreateSkillForm from './components/skill/CreateSkillForm';
import UpdateSkillForm from './components/skill/UpdateSkillForm';
import ProjectList from './components/project/ProjectList';
import CreateProjectForm from './components/project/CreateProjectForm';
import UpdateProjectForm from './components/project/UpdateProjectForm';
import LinkList from './components/link/LinkList';
import CreateLinkForm from './components/link/CreateLinkForm';
import UpdateLinkForm from './components/link/UpdateLinkForm';

// Week starts on Monday
registerLocale('en-GB', enGB);

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/profiles" element={<ProfileList />} />
            <Route path="/profiles/new" element={<CreateProfileForm />} />
            <Route path="/profiles/:id" element={<UpdateProfileForm />} />

            <Route path="/work-experiences" element={<WorkExperienceList />} />
            <Route path="/work-experiences/new" element={<CreateWorkExperienceForm />} />
            <Route path="/work-experiences/:id" element={<UpdateWorkExperienceForm />} />

            <Route path="/educations" element={<EducationList />} />
            <Route path="/educations/new" element={<CreateEducationForm />} />
            <Route path="/educations/:id" element={<UpdateEducationForm />} />

            <Route path="/skills" element={<SkillList />} />
            <Route path="/skills/new" element={<CreateSkillForm />} />
            <Route path="/skills/:id" element={<UpdateSkillForm />} />

            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/new" element={<CreateProjectForm />} />
            <Route path="/projects/:id" element={<UpdateProjectForm />} />

            <Route path="/links" element={<LinkList />} />
            <Route path="/links/new" element={<CreateLinkForm />} />
            <Route path="/links/:id" element={<UpdateLinkForm />} />
        </Routes>
    );
}

export default App;