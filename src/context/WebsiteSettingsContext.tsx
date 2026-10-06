import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InstituteSettings,
  DEFAULT_SETTINGS,
  fetchInstituteSettings,
  CustomCourse,
  fetchCustomCourses
} from '../firebase';
import { COURSES_DATA } from '../data/coursesData';
import { Course } from '../types';

interface WebsiteContextType {
  settings: InstituteSettings;
  courses: Course[];
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const WebsiteContext = createContext<WebsiteContextType>({
  settings: DEFAULT_SETTINGS,
  courses: COURSES_DATA,
  refreshData: async () => {},
  isLoading: false
});

export const WebsiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<InstituteSettings>(DEFAULT_SETTINGS);
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [fetchedSettings, customCourses] = await Promise.all([
        fetchInstituteSettings().catch(() => DEFAULT_SETTINGS),
        fetchCustomCourses().catch(() => [])
      ]);

      if (fetchedSettings) {
        setSettings(fetchedSettings);
      }

      // If custom courses exist in Firestore, merge or use them
      if (customCourses && customCourses.length > 0) {
        const mappedCourses: Course[] = customCourses.map((c) => ({
          id: c.id,
          title: c.title,
          tagline: c.subtitle || c.overview.slice(0, 80) + '...',
          level: (c.level as any) || 'Hands-on Practical',
          duration: c.duration,
          tools: ['Excel', 'QuickBooks', 'Xero'],
          overview: c.overview,
          whatYouWillLearn: c.topics && c.topics.length > 0 ? c.topics : ['Comprehensive practical accounting training'],
          practicalSkills: ['Real business transactions', 'Reconciliation & Reporting'],
          keyModules: [
            {
              title: 'Practical Curriculum Modules',
              topics: c.topics && c.topics.length > 0 ? c.topics : ['Full accounting workflows']
            }
          ]
        }));
        setCourses(mappedCourses);
      } else {
        setCourses(COURSES_DATA);
      }
    } catch (e) {
      console.warn('Error loading website settings, using defaults:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <WebsiteContext.Provider value={{ settings, courses, refreshData: loadAll, isLoading }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsiteSettings = () => useContext(WebsiteContext);
