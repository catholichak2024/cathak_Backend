import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import SwaggerUi from "swagger-ui-express";
import { specs } from "./swagger/swagger.config.js";
import { healthRoute } from './routes/health.js';
import { loginRoute } from "./routes/login.js";
import { gradeRoute } from "./routes/grade.js";
import { mypageRoute } from "./routes/mypage.js";
import { specRoute } from "./routes/spec.js";
import { culturalRoute } from "./routes/cultural.js";
import { majorfoundationRoute } from "./routes/majorfoundation.js";
import { majorRoute } from "./routes/major.js";

dotenv.config();
 
const app = express()
const port = process.env.PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization'); // 이 줄을 추가합니다.
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use((req, res, next) => {
    res.success = (success) => {
      return res.json({ resultType: "SUCCESS", error: null, success });
    };
  
    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
      return res.json({
        resultType: "FAIL",
        error: { errorCode, reason, data },
        success: null,
      });
    };
    
    
    next();
  });

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//swagger
app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// router setting
app.use("/health", healthRoute);
app.use("/EveryGrade/user", loginRoute);
app.use("/EveryGrade/grade", gradeRoute);
app.use("/EveryGrade/mypage", mypageRoute);
app.use("/EveryGrade/spec", specRoute);
app.use("/EveryGrade/cultural", culturalRoute);
app.use("/EveryGrade/majorfoundation", majorfoundationRoute);
app.use("/EveryGrade/major", majorRoute);

app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
  
    res.status(err.statusCode || 500).error({
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})