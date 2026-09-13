# بيان مشروع Artto — للذكاء الاصطناعي في VS Code from deepseek

> **الغرض من هذا البيان:** تزويد أي AI مساعد (GitHub Copilot Free، Continue، Cody، أو غيره) بالسياق الكامل لمشروع Artto، بحيث يعمل ضمن حدود معمارية محددة، لا عشوائيًا.

> **طريقة الاستخدام:** ضعه في ملف `PROJECT_BRIEF.md` في جذر المشروع، أو ألصقه في بداية أي محادثة جديدة مع AI.

> **اللغة:** يفهم AI العربي والإنجليزي. الأسماء التقنية بالإنجليزية إلزامية.

---

## ١. هوية المشروع

```text

Name:        Artto

Type:        Offline-first drawing & animation application

Platform:    Modern web browsers (PWA)

Target:      Windows, Linux, macOS, Android, iOS, iPadOS, tablets, touch, mouse, stylus

Core value:  Open → use → work locally → save locally → no server for artwork

Status:      v51 (single-file prototype, PWA-enabled)

```

**الهدف النهائي:**

> A cross-platform, offline-first drawing and animation application that runs directly in modern web browsers, stores the user's work locally, supports mouse/touch/stylus input, and gradually approaches the functionality of traditional desktop drawing software without requiring installation.

**ما ليس هدفًا:**

- ليس نسخة من Klecks أو Celstomp أو Photoshop.

- ليس تطبيق SaaS أو cloud-first.

- ليس محرر SVG أو vector editor.

---

## ٢. الثوابت المعمارية (لا تُخالَف)

هذه أربعة حدود يجب أن يبقى فصلها واضحًا في الكود دائمًا. أي تعديل يخلطها = Bug حتمي.

```text

1. Brush opacity   ≠  Layer opacity

2. Selection state ≠  Selection overlay (DOM)

3. Document state  ≠  UI state

4. Frame data      ≠  Timeline UI (مستقبلًا)

```

**قاعدة عامة:**

> إذا كان نوع (type) يُستخدم في أكثر من نظام، فهو إما في `Core` أو يُشتق منه — لا يُخزَّن مرتين.

---

## ٣. القرارات المعمارية المُتخذة

### ٣.١ Input Model

```text

pointerType === 'pen'    →  ارسم دائمًا، استخدم pressure

pointerType === 'mouse'  →  ارسم دائمًا، pressure = 0.5 ثابت

pointerType === 'touch'  →  القاعدة تعتمد على السياق:

                             - إذا penActiveInSession === true → pan/pinch فقط

                             - إذا penActiveInSession === false → ارسم بإصبع واحد

                                                                pan/pinch بإصبعين

```

**مبدأ Palm Rejection:** بمجرد استخدام القلم في الجلسة، اللمس لا يرسم بعد ذلك.

**الأثر:** الرسم يعمل على iPad بدون قلم، ولا تترك راحة اليد خطوطًا مع القلم.

### ٣.٢ Eraser Model

```text

التمثيل:  Eraser = Brush بخاصية tool = 'eraser'

التطبيق:  globalCompositeOperation = 'destination-out' عند commit

التخزين:  الطبقة تبقى Canvas نقطي (raster)

```

**صيغة الـ Stroke الرسمية:**

```js

const Stroke = {

  tool: 'brush' | 'eraser',

  points: [{ x, y, p }],   // p = pressure 0..1

  color: '#rrggbb',        // يُهمَل في حالة eraser

  size: number,

  opacity: number,         // 0..1 — تُطبَّق مرة واحدة فقط

  layerId: string,         // للـ Undo لاحقًا

  frameIndex: number       // للـ Animation لاحقًا

};

```

**ممنوع:** استخدام "الرسم بلون الخلفية" كـ Eraser. يكسر الطبقات الشفافة و Blend Modes.

### ٣.٣ Offline Model

```text

App Shell:       Service Worker (cache-first)

Projects:        IndexedDB (كائنات، لا نصوص)

Project Format:  JSON للميتاداتا + Blob لكل طبقة (لا Base64)

Autosave:        بعد كل stroke، بتأخير 3 ثوان

```

### ٣.٤ Frame Architecture (مؤجَّل، لكن القرار مبدئي)

**النموذج المُتبنَّى (لاحقًا):**

```text

Layer owns frames[]

Scene → Layer → Frame    (نموذج Nanimate/Celstomp)

```

**قرار مؤقت:** لا يُنفَّذ الآن. لكن عند إدخاله، سيُغيَّر:

- `Layer.frames = [{canvas, ctx}]` بدل `Layer.canvas`.

- `renderComposite` يقرأ من `frames[frameIndex]`.

- `activeFrame` في Core، لا في UI.

**لا تُدخل Frame الآن.** v51 يجب أن يستقر أولًا.

---

## ٤. المراجع الهندسية

المشاريع التالية مراجع، **ليست مصادر نسخ**. ادرسها لفهم التصميم، ثم نفّذ بشكل مستقل.

| المشروع | الأهمية | ماذا نأخذ منه |

|---|---|---|

| **Celstomp** | عالية جدًا | بنية الرسم + Layers + Blend + Animation |

| **Klecks** | عالية جدًا | Brush engine + Pressure + WebGL + Selection |

| **offline-sketch** | عالية | Pointer Events + Stroke representation |

| **miniPaint** | عالية | Layers + Canvas + History + Selection |

| **Piskel** | متوسطة/عالية | Frames + Animation + Timeline |

| **Wick Editor** | متوسطة/عالية | Animation editor architecture |

| **Nanimate** | عالية | Scene → Layer → Frame |

| **Excalidraw** | متوسطة | Canvas architecture + State + Undo |

| **tldraw** | متوسطة | Editor architecture + Tools |

| **SVG-Edit** | متوسطة | Editor/Renderer separation |

| **[Paper.js](http://paper.js/)** | منخفضة | Vector rendering |

| **[Fabric.js](http://fabric.js/)** | منخفضة | Canvas objects + Serialization |

| **[Konva.js](http://konva.js/)** | منخفضة | Canvas performance reference |

**قاعدة المراجعة:**

```text

1. Find the relevant subsystem.

2. Understand its data model.

3. Understand its rendering path.

4. Understand its state management.

5. Identify why the architecture works.

6. Compare it with Artto.

7. Take the architectural idea if useful.

8. Implement it independently.

9. Test Artto.

10. Do not replace working Artto systems unnecessarily.

```

**تحذير:** لا تفترض أن المشروع المرجعي صحيح لمجرد أنه يعمل. ولا تنسخ كودًا قبل فحص ترخيصه.

---

## ٥. بنية الملفات الحالية (v51)

```text

artto/

│

├── index.html              ← UI + Core (مؤقتًا monolith، سيُفصل تدريجيًا)

├── manifest.json           ← PWA manifest

├── [sw.js](http://sw.js/)                   ← Service Worker

├── icon-source.svg         ← الأيقونة المصدر

├── icon-192.png            ← مولّدة من SVG

├── icon-512.png            ← مولّدة من SVG

└── PROJECT_BRIEF.md        ← هذا الملف

```

**شروط تقنية:**

- `[sw.js](http://sw.js/)` **يجب** أن يبقى في الجذر (Service Worker يتحكم فقط في نطاقه).

- `index.html` في الجذر لأن `start_url: "./"`.

- الأيقونات بجانب `index.html`.

**الشجرة المستقبلية (Milestone 2+):**

```text

artto/

├── index.html              ← UI فقط

├── core/

│   ├── [document.js](http://document.js/)         ← Document, Layer, Frame

│   ├── [history.js](http://history.js/)          ← Undo/Redo

│   └── [project.js](http://project.js/)          ← Save/Load

├── engine/

│   ├── [draw.js](http://draw.js/)             ← Stroke rendering

│   ├── [composite.js](http://composite.js/)        ← Layer compositing

│   └── [selection.js](http://selection.js/)        ← Selection operations

├── io/

│   ├── [input.js](http://input.js/)            ← Pointer/Pen/Touch

│   └── [storage.js](http://storage.js/)          ← IndexedDB + Export

├── ui/

│   ├── [toolbar.js](http://toolbar.js/)

│   ├── [layers-panel.js](http://layers-panel.js/)

│   └── [timeline.js](http://timeline.js/)

├── [sw.js](http://sw.js/)

├── manifest.json

└── assets/

    ├── icon-source.svg

    ├── icon-192.png

    └── icon-512.png

```

**لا تفصل الآن.** الفصل يحدث في Milestone 2 بالتدريج، مع اختبار Regression بعد كل خطوة.

---

## ٦. Milestones

### Milestone 1 — v51 (الحالي)

```text

✅ PWA: manifest + SW + icons

✅ Input: pen/mouse/touch + palm rejection

✅ Eraser model: destination-out

✅ Offline: IndexedDB + autosave

✅ إصلاح Bug: debugHUD, isTouchNavTarget

✅ History limit: 8 → 30

⏳ اختبار Regression كامل

```

### Milestone 2 — Frame Architecture + Core فصل (التالي)

```text

1. قرار Frame architecture مكتوب (مراجع + قرار + أثر)

2. فصل core/[document.js](http://document.js/) فقط

3. إدخال frames[] في Layer (بطول 1 مؤقتًا)

4. renderComposite يقرأ frameIndex

5. History: snapshot طبقة واحدة بدل المستند

6. اختبار Regression كامل

```

### Milestone 3 — Animation

```text

Timeline UI + Onion Skin + Playback + Export

```

### Milestone 4 — Performance & Polish

```text

OffscreenCanvas + Web Workers إن لزم + تحسين History

```

---

## ٧. قواعد العمل مع AI

### ٧.١ طريقة إعطاء المهمة

**ممنوع:**

```text

Build Artto.

أضف ميزة Frame.

أعد كتابة محرك الرسم.

```

**مطلوب:**

```text

First inspect the existing architecture.

Do not modify files yet.

Identify how [النظام المحدد] is currently calculated.

Compare with [المرجع المحدد].

Explain the differences.

Identify the root cause of the current bug (إن وُجد).

Only after that, implement the smallest safe fix.

Do not rewrite unrelated systems.

```

### ٧.٢ قبل كل تعديل — افترض أن هذه تعمل

```text

- Zoom

- Tools

- Undo / Redo

- Layer opacity

- Canvas interaction

- Existing layer functionality

- PWA registration

- Autosave

```

إذا أصلحت Bug في نظام، **لا تكسر الأنظمة الأخرى**.

### ٧.٣ عند وجود Bug محدد

**لا تفعل:**

```text

Rewrite brush engine  ← لمجرد مشكلة في Brush opacity

```

**افعل:**

```text

1. Trace the existing [نظام] path.

2. Find where [القيمة] is calculated.

3. Find where it is passed to rendering.

4. Compare with the related system's path.

5. Identify the root cause.

6. Make the smallest safe change.

7. Test all affected systems.

```

### ٧.٤ بعد كل تعديل — أرسل هذا التقرير

```text

1. Root cause

2. Files changed

3. What changed

4. Why the change is safe

5. Tests performed

6. Remaining risks

```

---

## ٨. قواعد الاختبار بعد كل تعديل

### Brush

- [ ] Opacity 100% / 50% / 10%

- [ ] Pressure (stylus)

- [ ] Eraser

- [ ] Different sizes

### Layers

- [ ] Layer opacity

- [ ] Multiple layers

- [ ] Hide/show

- [ ] Reordering

- [ ] Create / delete

### Blend

- [ ] Normal

- [ ] Multiply

- [ ] Screen

- [ ] Darken / Lighten

- [ ] Overlay / Hard-light / Soft-light / Difference / Exclusion

  *(ملاحظة: بعضها غير مدعوم بدقة في Canvas 2D — راجع قسم ١٠)*

### Selection

- [ ] Create (rect + lasso)

- [ ] Move

- [ ] Deselect

- [ ] Delete

- [ ] Replace selection

- [ ] Overlay disappears correctly

### History

- [ ] Draw

- [ ] Undo

- [ ] Redo

- [ ] Layer change

- [ ] Selection change

- [ ] Multiple consecutive actions

### Canvas

- [ ] Zoom

- [ ] Pan

- [ ] Resize

- [ ] Mouse

- [ ] Touch

- [ ] Stylus

### PWA (v51 جديد)

- [ ] Service Worker مُسجَّل (DevTools → Application → Service Workers)

- [ ] Manifest يقرأ

- [ ] Cache Storage يحتوي `artto-v51-*`

- [ ] IndexedDB يحتوي قاعدة `artto`

- [ ] Autosave بعد stroke

- [ ] استرجاع الجلسة بعد إغلاق المتصفح

- [ ] العمل offline (DevTools → Network → Offline → F5)

**لا تعتبر المهمة مكتملة لمجرد اختفاء الـ Bug الأصلي. تأكد من عدم وجود Regression.**

---

## ٩. تحذيرات صريحة

### ممنوع

- ❌ إعادة كتابة المشروع بالكامل

- ❌ نسخ كود من المشاريع المرجعية دون فحص الترخيص

- ❌ خلط Brush opacity مع Layer opacity

- ❌ استخدام `file://` للاختبار (SW لن يعمل)

- ❌ إدخال Frame architecture قبل Milestone 2

- ❌ نقل `[sw.js](http://sw.js/)` من الجذر

- ❌ استخدام `toDataURL` في autosave (استخدم `toBlob`)

### مسموح بل مطلوب

- ✅ أصغر تغيير آمن

- ✅ اختبار Regression قبل الإعلان عن نجاح

- ✅ الرجوع للمراجع عند الحاجة لقرار معماري

- ✅ كتابة القرار قبل الكود

---

## ١٠. قيود تقنية معروفة

### Canvas 2D Blend Modes

Canvas 2D يدعم بشكل موثوق:

```text

✅ source-over, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion

```

لكن **النتيجة قد تختلف عن WebGL/Photoshop** في:

```text

⚠️ soft-light

⚠️ hard-light

⚠️ color-dodge / color-burn

```

**القرار:** إبقاء Canvas 2D. لا انتقال إلى WebGL في v51. يُعاد التقييم فقط عند ظهور مشكلة حقيقية.

### Service Worker

```text

- لا يعمل عبر file://

- لا يعمل عبر http:// غير localhost

- يحتاج HTTPS أو localhost

```

### IndexedDB

```text

- حجم التخزين محدود حسب المتصفح (عادة 50MB+)

- غير متزامن (Promise-based)

- لا يمكن استخدامه في Web Worker بدون تمرير

```

---

## ١١. طريقة تشغيل المشروع

```bash

# التطوير

cd /path/to/artto

python3 -m http.server 8080

# افتح [http://localhost:8080/](http://localhost:8080/)

```

```bash

# الاختبار على الهاتف

cloudflared tunnel --url [http://localhost:8080](http://localhost:8080/)

# افتح الرابط على الهاتف

```

```bash

# النشر

# ارفع المجلد كما هو إلى:

# - Cloudflare Pages

# - GitHub Pages

# - Netlify / Vercel

```

---

## ١٢. ملاحظة أخيرة للـ AI

**هذا البيان ليس دستورًا جامدًا.** هو خلاصة قرارات مُتخذة بعد مراجعة مراجع حقيقية. عند الحاجة لتعديله، **اقترح التعديل صراحةً** بدلًا من مخالفته بصمت.

**قاعدة ذهبية:**

> إذا وجدت نفسك تفكر "أعد كتابة X"، توقف. ارجع للقسم ٧.٣.

> إذا وجدت نفسك تفكر "أضيف ميزة Y"، تأكد أنها ليست في Milestone 2+.

> إذا وجدت نفسك تفكر "هذا سريع بما يكفي"، اختبره على جهاز متوسط أولًا.

**البساطة أولًا. ثم الأداء عند ظهور حاجة حقيقية. ثم التعقيد عند الضرورة القصوى. لا العكس.**

---

**الإصدار:** v51

**آخر تحديث:** بعد قرارات Input + Eraser + Offline

**الحالة:** ينتظر نتيجة اختبار Regression

**الخطوة التالية:** Milestone 2 — قرار Frame architecture
