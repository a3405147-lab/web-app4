import { Group, GroupingMethod } from '../types';

export const generateGroups = (
  totalStudents: number,
  groupCount: number,
  method: GroupingMethod
): Group[] => {
  if (totalStudents <= 0 || groupCount <= 0) {
    return [];
  }

  // Create array of student IDs [1, 2, ..., N]
  let students = Array.from({ length: totalStudents }, (_, i) => i + 1);

  // Shuffle if random
  if (method === GroupingMethod.RANDOM) {
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [students[i], students[j]] = [students[j], students[i]];
    }
  }

  // Initialize groups
  const groups: Group[] = Array.from({ length: groupCount }, (_, i) => ({
    id: i + 1,
    students: [],
  }));

  if (method === GroupingMethod.SEQUENTIAL) {
    // Sequential distribution (Chunks)
    // Example: 10 students, 3 groups -> [1,2,3,4], [5,6,7], [8,9,10]
    // We need to distribute remainders evenly
    
    const baseSize = Math.floor(totalStudents / groupCount);
    const remainder = totalStudents % groupCount;
    
    let currentStudentIdx = 0;
    
    for (let i = 0; i < groupCount; i++) {
      // If we have a remainder, the first 'remainder' groups get one extra student
      const size = i < remainder ? baseSize + 1 : baseSize;
      
      for (let j = 0; j < size; j++) {
        if (currentStudentIdx < students.length) {
            groups[i].students.push(students[currentStudentIdx]);
            currentStudentIdx++;
        }
      }
    }

  } else {
    // Random (Dealing style to ensure mixing even if specific counts)
    // Or just simple dealing for balanced distribution
    students.forEach((student, index) => {
      const groupIndex = index % groupCount;
      groups[groupIndex].students.push(student);
    });
  }
  
  // Sort students within groups for readability
  groups.forEach(g => g.students.sort((a, b) => a - b));

  return groups;
};