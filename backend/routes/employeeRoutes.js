const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  replaceEmployee,
  patchEmployee,
  deleteEmployee,
  existsEmployee,
  bulkCreate,
  bulkUpdate,
  bulkDelete,
  getByName,
  getByState,
  getByCountry,
  getByCity,
  getByTimezone,
  getByPrimarySkill,
  getBySecondarySkill,
  getByDomain,
  getByExperience,
  getByCertification,
  getVerified,
  getAllProjects,
  getAllTasks,
  getTopExperience,
  getTopSkills,
  getCloudEngineers,
  getDevOpsEngineers,
  getAIEngineers,
  getFullStack,
  getRecentCertifications,
  getByProjectId,
  getByTaskId,
  getPerformance,
  getStatsById,
  searchEmployees,
  sortExperienceDesc,
  sortNameAsc,
  sortProjectAsc,
  sortDomainAsc,
  sortCertificationDesc,
  filterHighExperience,
  filterLowExperience,
  filterVerified,
  filterCloud,
  filterFinance,
  filterHealthcare,
  filterDevOps,
  filterAI,
  filterFullstack,
  filterKubernetes,
  filterReact,
  filterNodejs,
  filterJava,
  filterPython,
  filterRecentCertifications,
  analyzeTopSkills,
  analyzeTopDomains,
  analyzeTopCertifications,
  analyzeTopProjects,
  analyzeTopTechnologies,
  analyzeTimezones,
  analyzeLocations,
  analyzeExperience,
  analyzeVerification,
  analyzeProjects,
  analyzeTasks,
  getCountryAnalysis,
  getStateAnalysis,
  statsCount,
  statsExperienceAvg,
  statsTopExperience,
  statsProjectCount,
  statsTaskCount,
  statsCountryCount,
  statsStateCount,
  statsDomainCount,
  statsSkillCount,
  statsCertificationCount,
  statsTimezoneCount,
  statsVerifiedCount,
  statsTechnologyCount,
  getRandomEmployee,
  getTrendingSkills,
  getRecentEmployees,
  getRecommendations,
  predictPerformance,
  predictProjectFit,
  getSegmentsTopPerformers,
  getSegmentsCloud,
  getSegmentsDevops,
  getSegmentsAI,
  getSegmentsFullstack,
  getHeatmapCountries,
  getHeatmapStates,
  getHeatmapSkills,
  getInsightsProjects,
  getInsightsTasks,
  getInsightsCertifications,
  getAlertsExpired,
  getAlertsWorkload,
  getAlertsDelays,
  reportIssue,
  getSystemHealth,
  getSystemVersion,
  getSystemConfig,
  cacheClear,
  getSystemLogs
} = require('../controllers/employeeController');

const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validateEmployee } = require('../middleware/validationMiddleware');
const rateLimit = require('../middleware/rateLimitMiddleware');
const auditLog = require('../middleware/auditMiddleware');
const { logger, requestTime } = require('../middleware/loggerMiddleware');

// HEAD & OPTIONS Good to Have Routes
router.route('/employees')
  .head((req, res) => {
    res.set('X-Collection-Type', 'Employees');
    res.status(200).end();
  })
  .options((req, res) => {
    res.set('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.status(200).end();
  });

router.route('/employees/:id')
  .head((req, res) => {
    res.status(200).end();
  })
  .options((req, res) => {
    res.set('Allow', 'GET, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(200).end();
  });

// Basic CRUD
router.get('/employees', rateLimit, getEmployees);
router.get('/employees/exists/:id', existsEmployee);
router.post('/employees/bulk-create', bulkCreate);
router.patch('/employees/bulk-update', bulkUpdate);
router.delete('/employees/bulk-delete', bulkDelete);

// Advanced practice subroutes (register before /employees/:id parameter routes)
router.get('/employees/random', getRandomEmployee);
router.get('/employees/trending-skills', getTrendingSkills);
router.get('/employees/recent', getRecentEmployees);
router.get('/employees/recommendations', getRecommendations);
router.get('/employees/predictions/performance', predictPerformance);
router.get('/employees/predictions/project-fit', predictProjectFit);

// Segments
router.get('/employees/segments/top-performers', getSegmentsTopPerformers);
router.get('/employees/segments/cloud-engineers', getSegmentsCloud);
router.get('/employees/segments/devops', getSegmentsDevops);
router.get('/employees/segments/ai-engineers', getSegmentsAI);
router.get('/employees/segments/fullstack', getSegmentsFullstack);

// Heatmaps
router.get('/employees/heatmap/countries', getHeatmapCountries);
router.get('/employees/heatmap/states', getHeatmapStates);
router.get('/employees/heatmap/skills', getHeatmapSkills);

// Insights & Alerts
router.get('/employees/insights/projects', getInsightsProjects);
router.get('/employees/insights/tasks', getInsightsTasks);
router.get('/employees/insights/certifications', getInsightsCertifications);
router.get('/employees/alerts/expired-certifications', getAlertsExpired);
router.get('/employees/alerts/high-workload', getAlertsWorkload);
router.get('/employees/alerts/project-delays', getAlertsDelays);

// System Config & Health
router.post('/employees/report', reportIssue);
router.get('/employees/system/health', getSystemHealth);
router.get('/employees/system/version', getSystemVersion);
router.get('/employees/system/config', getSystemConfig);
router.post('/employees/cache/clear', cacheClear);
router.get('/employees/logs', getSystemLogs);

// Sorting Sub-Routes
router.get('/employees/sort/experience-desc', sortExperienceDesc);
router.get('/employees/sort/name-asc', sortNameAsc);
router.get('/employees/sort/project-asc', sortProjectAsc);
router.get('/employees/sort/domain-asc', sortDomainAsc);
router.get('/employees/sort/certification-desc', sortCertificationDesc);

// Filtering Sub-Routes
router.get('/employees/filter/high-experience', filterHighExperience);
router.get('/employees/filter/low-experience', filterLowExperience);
router.get('/employees/filter/verified', filterVerified);
router.get('/employees/filter/cloud', filterCloud);
router.get('/employees/filter/finance', filterFinance);
router.get('/employees/filter/healthcare', filterHealthcare);
router.get('/employees/filter/devops', filterDevOps);
router.get('/employees/filter/ai', filterAI);
router.get('/employees/filter/fullstack', filterFullstack);
router.get('/employees/filter/kubernetes', filterKubernetes);
router.get('/employees/filter/react', filterReact);
router.get('/employees/filter/nodejs', filterNodejs);
router.get('/employees/filter/java', filterJava);
router.get('/employees/filter/python', filterPython);
router.get('/employees/filter/recent-certifications', filterRecentCertifications);

// Info & parameters
router.get('/employees/verified', getVerified);
router.get('/employees/projects', getAllProjects);
router.get('/employees/tasks', getAllTasks);
router.get('/employees/top-experience', getTopExperience);
router.get('/employees/top-skills', getTopSkills);
router.get('/employees/cloud-engineers', getCloudEngineers);
router.get('/employees/devops-engineers', getDevOpsEngineers);
router.get('/employees/ai-engineers', getAIEngineers);
router.get('/employees/fullstack', getFullStack);
router.get('/employees/recent-certifications', getRecentCertifications);

router.get('/employees/name/:name', getByName);
router.get('/employees/state/:state', getByState);
router.get('/employees/country/:country', getByCountry);
router.get('/employees/city/:city', getByCity);
router.get('/employees/timezone/:timezone', getByTimezone);
router.get('/employees/primary-skill/:skill', getByPrimarySkill);
router.get('/employees/secondary-skill/:skill', getBySecondarySkill);
router.get('/employees/domain/:domain', getByDomain);
router.get('/employees/experience/:years', getByExperience);
router.get('/employees/certification/:certification', getByCertification);

// Route parameters
router.get('/employees/project/:projectId', getByProjectId);
router.get('/employees/task/:taskId', getByTaskId);
router.get('/employees/performance/:id', getPerformance);
router.get('/employees/stats/:id', getStatsById);

// Dynamic Query & CRUD router fallback
router.get('/employees/:id', getEmployeeById);
router.post('/employees', validateEmployee, createEmployee);
router.put('/employees/:id', validateEmployee, replaceEmployee);
router.patch('/employees/:id', patchEmployee);
router.delete('/employees/:id', deleteEmployee);

// Search Routes
router.get('/search/employees', rateLimit, searchEmployees);

// Analytics Routes
router.get('/analytics/employees/top-skills', rateLimit, analyzeTopSkills);
router.get('/analytics/employees/top-domains', analyzeTopDomains);
router.get('/analytics/employees/top-certifications', analyzeTopCertifications);
router.get('/analytics/employees/top-projects', analyzeTopProjects);
router.get('/analytics/employees/top-technologies', analyzeTopTechnologies);
router.get('/analytics/employees/timezone-analysis', analyzeTimezones);
router.get('/analytics/employees/location-analysis', analyzeLocations);
router.get('/analytics/employees/experience-analysis', analyzeExperience);
router.get('/analytics/employees/verification-analysis', analyzeVerification);
router.get('/analytics/employees/project-analysis', analyzeProjects);
router.get('/analytics/employees/task-analysis', analyzeTasks);
router.get('/analytics/employees/skill-distribution', analyzeTopSkills);
router.get('/analytics/employees/domain-distribution', analyzeTopDomains);
router.get('/analytics/employees/country-analysis', getCountryAnalysis);
router.get('/analytics/employees/state-analysis', getStateAnalysis);

// Statistics Routes
router.get('/stats/employees/count', statsCount);
router.get('/stats/employees/experience-average', statsExperienceAvg);
router.get('/stats/employees/top-experience', statsTopExperience);
router.get('/stats/employees/project-count', statsProjectCount);
router.get('/stats/employees/task-count', statsTaskCount);
router.get('/stats/employees/country-count', statsCountryCount);
router.get('/stats/employees/state-count', statsStateCount);
router.get('/stats/employees/domain-count', statsDomainCount);
router.get('/stats/employees/skill-count', statsSkillCount);
router.get('/stats/employees/certification-count', statsCertificationCount);
router.get('/stats/employees/timezone-count', statsTimezoneCount);
router.get('/stats/employees/verified-count', statsVerifiedCount);
router.get('/stats/employees/project-distribution', analyzeProjects);
router.get('/stats/employees/task-distribution', analyzeTasks);
router.get('/stats/employees/technology-count', statsTechnologyCount);

// Middleware Practising routes
router.get('/admin/employees', protect, adminOnly, getEmployees);
router.get('/admin/projects', protect, adminOnly, getAllProjects);
router.get('/admin/tasks', protect, adminOnly, getAllTasks);
router.get('/admin/certifications', protect, adminOnly, (req, res) => {
  res.status(200).json({ message: 'Admin access to certifications' });
});

router.post('/protected/employees', protect, validateEmployee, createEmployee);
router.patch('/protected/employees/:id', protect, patchEmployee);
router.delete('/protected/employees/:id', protect, deleteEmployee);
router.post('/protected/projects', protect, (req, res) => {
  res.status(201).json({ message: 'Protected project created successfully' });
});
router.patch('/protected/projects/:projectId', protect, (req, res) => {
  res.status(200).json({ message: 'Protected project updated' });
});
router.delete('/protected/projects/:projectId', protect, (req, res) => {
  res.status(200).json({ message: 'Protected project deleted' });
});

// Middleware practicing routes
router.get('/middleware/logger', logger, (req, res) => {
  res.status(200).json({ message: 'Logger middleware practiced successfully' });
});
router.get('/middleware/auth', protect, (req, res) => {
  res.status(200).json({ message: 'Auth middleware practiced successfully' });
});
router.get('/middleware/rate-limit', rateLimit, (req, res) => {
  res.status(200).json({ message: 'Rate-limit middleware practiced successfully' });
});
router.get('/middleware/error-handler', (req, res, next) => {
  next(new Error('This is a simulated global error'));
});
router.get('/middleware/request-time', requestTime, (req, res) => {
  res.status(200).json({ message: 'Request timing middleware practiced successfully', requestTime: req.requestTime });
});
router.get('/middleware/role-check', protect, adminOnly, (req, res) => {
  res.status(200).json({ message: 'Role check authorized successfully' });
});
router.get('/middleware/validation', validateEmployee, (req, res) => {
  res.status(200).json({ message: 'Validation middleware passed successfully' });
});
router.get('/middleware/audit-log', auditLog, (req, res) => {
  res.status(200).json({ message: 'Audit-log middleware practiced successfully' });
});

module.exports = router;
