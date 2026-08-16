# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14_category.spec.js >> FR-14 — Category Management CRUD (Data-Driven) >> TC-DT-004: Add category with duplicate name
- Location: ..\tests\FR14\scripts\fr14_category.spec.js:35:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "EShop Admin" [level=1] [ref=e5]
    - list [ref=e6]:
      - listitem [ref=e7] [cursor=pointer]: Dashboard
      - listitem [ref=e8] [cursor=pointer]: Danh mục
      - listitem [ref=e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=e12] [cursor=pointer]: Người dùng
      - listitem [ref=e13] [cursor=pointer]: Đăng xuất
  - generic [ref=e15]:
    - heading "Quản lý Danh mục" [level=2] [ref=e16]
    - generic [ref=e17]:
      - textbox "Tên danh mục mới" [ref=e18]
      - button "Thêm mới" [ref=e19] [cursor=pointer]
    - table [ref=e20]:
      - rowgroup [ref=e21]:
        - row [ref=e22]:
          - columnheader "ID" [ref=e23]
          - columnheader "Tên Danh Mục" [ref=e24]
          - columnheader "Hành động" [ref=e25]
      - rowgroup [ref=e26]:
        - row [ref=e27]:
          - cell "#2" [ref=e28]
          - cell "Laptop" [ref=e29]
          - cell [ref=e30]:
            - button "Xóa" [ref=e31] [cursor=pointer]
        - row [ref=e32]:
          - cell "#3" [ref=e33]
          - cell "Phụ kiện" [ref=e34]
          - cell [ref=e35]:
            - button "Xóa" [ref=e36] [cursor=pointer]
        - row [ref=e37]:
          - cell "#5" [ref=e38]
          - cell [ref=e39]
          - cell [ref=e40]:
            - button "Xóa" [ref=e41] [cursor=pointer]
        - row [ref=e42]:
          - cell "#7" [ref=e43]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e44]
          - cell [ref=e45]:
            - button "Xóa" [ref=e46] [cursor=pointer]
        - row [ref=e47]:
          - cell "#8" [ref=e48]
          - cell "<script>alert('xss')</script>" [ref=e49]
          - cell [ref=e50]:
            - button "Xóa" [ref=e51] [cursor=pointer]
        - row [ref=e52]:
          - cell "#9" [ref=e53]
          - cell "Unauthorized Category" [ref=e54]
          - cell [ref=e55]:
            - button "Xóa" [ref=e56] [cursor=pointer]
        - row [ref=e57]:
          - cell "#11" [ref=e58]
          - cell [ref=e59]
          - cell [ref=e60]:
            - button "Xóa" [ref=e61] [cursor=pointer]
        - row [ref=e62]:
          - cell "#13" [ref=e63]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e64]
          - cell [ref=e65]:
            - button "Xóa" [ref=e66] [cursor=pointer]
        - row [ref=e67]:
          - cell "#14" [ref=e68]
          - cell "<script>alert('xss')</script>" [ref=e69]
          - cell [ref=e70]:
            - button "Xóa" [ref=e71] [cursor=pointer]
        - row [ref=e72]:
          - cell "#15" [ref=e73]
          - cell "Unauthorized Category" [ref=e74]
          - cell [ref=e75]:
            - button "Xóa" [ref=e76] [cursor=pointer]
        - row [ref=e77]:
          - cell "#17" [ref=e78]
          - cell [ref=e79]
          - cell [ref=e80]:
            - button "Xóa" [ref=e81] [cursor=pointer]
        - row [ref=e82]:
          - cell "#19" [ref=e83]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e84]
          - cell [ref=e85]:
            - button "Xóa" [ref=e86] [cursor=pointer]
        - row [ref=e87]:
          - cell "#20" [ref=e88]
          - cell "<script>alert('xss')</script>" [ref=e89]
          - cell [ref=e90]:
            - button "Xóa" [ref=e91] [cursor=pointer]
        - row [ref=e92]:
          - cell "#21" [ref=e93]
          - cell "Unauthorized Category" [ref=e94]
          - cell [ref=e95]:
            - button "Xóa" [ref=e96] [cursor=pointer]
        - row [ref=e97]:
          - cell "#23" [ref=e98]
          - cell [ref=e99]
          - cell [ref=e100]:
            - button "Xóa" [ref=e101] [cursor=pointer]
        - row [ref=e102]:
          - cell "#25" [ref=e103]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e104]
          - cell [ref=e105]:
            - button "Xóa" [ref=e106] [cursor=pointer]
        - row [ref=e107]:
          - cell "#26" [ref=e108]
          - cell "<script>alert('xss')</script>" [ref=e109]
          - cell [ref=e110]:
            - button "Xóa" [ref=e111] [cursor=pointer]
        - row [ref=e112]:
          - cell "#27" [ref=e113]
          - cell "Unauthorized Category" [ref=e114]
          - cell [ref=e115]:
            - button "Xóa" [ref=e116] [cursor=pointer]
        - row [ref=e117]:
          - cell "#29" [ref=e118]
          - cell [ref=e119]
          - cell [ref=e120]:
            - button "Xóa" [ref=e121] [cursor=pointer]
        - row [ref=e122]:
          - cell "#31" [ref=e123]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e124]
          - cell [ref=e125]:
            - button "Xóa" [ref=e126] [cursor=pointer]
        - row [ref=e127]:
          - cell "#32" [ref=e128]
          - cell "<script>alert('xss')</script>" [ref=e129]
          - cell [ref=e130]:
            - button "Xóa" [ref=e131] [cursor=pointer]
        - row [ref=e132]:
          - cell "#33" [ref=e133]
          - cell "Unauthorized Category" [ref=e134]
          - cell [ref=e135]:
            - button "Xóa" [ref=e136] [cursor=pointer]
        - row [ref=e137]:
          - cell "#35" [ref=e138]
          - cell [ref=e139]
          - cell [ref=e140]:
            - button "Xóa" [ref=e141] [cursor=pointer]
        - row [ref=e142]:
          - cell "#37" [ref=e143]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e144]
          - cell [ref=e145]:
            - button "Xóa" [ref=e146] [cursor=pointer]
        - row [ref=e147]:
          - cell "#38" [ref=e148]
          - cell "<script>alert('xss')</script>" [ref=e149]
          - cell [ref=e150]:
            - button "Xóa" [ref=e151] [cursor=pointer]
        - row [ref=e152]:
          - cell "#39" [ref=e153]
          - cell "Unauthorized Category" [ref=e154]
          - cell [ref=e155]:
            - button "Xóa" [ref=e156] [cursor=pointer]
        - row [ref=e157]:
          - cell "#41" [ref=e158]
          - cell [ref=e159]
          - cell [ref=e160]:
            - button "Xóa" [ref=e161] [cursor=pointer]
        - row [ref=e162]:
          - cell "#42" [ref=e163]
          - cell "Điện thoại" [ref=e164]
          - cell [ref=e165]:
            - button "Xóa" [ref=e166] [cursor=pointer]
        - row [ref=e167]:
          - cell "#43" [ref=e168]
          - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e169]
          - cell [ref=e170]:
            - button "Xóa" [ref=e171] [cursor=pointer]
        - row [ref=e172]:
          - cell "#44" [ref=e173]
          - cell "<script>alert('xss')</script>" [ref=e174]
          - cell [ref=e175]:
            - button "Xóa" [ref=e176] [cursor=pointer]
        - row [ref=e177]:
          - cell "#45" [ref=e178]
          - cell "Unauthorized Category" [ref=e179]
          - cell [ref=e180]:
            - button "Xóa" [ref=e181] [cursor=pointer]
        - row [ref=e182]:
          - cell "#46" [ref=e183]
          - cell "Gia dụng" [ref=e184]
          - cell [ref=e185]:
            - button "Xóa" [ref=e186] [cursor=pointer]
        - row [ref=e187]:
          - cell "#47" [ref=e188]
          - cell [ref=e189]
          - cell [ref=e190]:
            - button "Xóa" [ref=e191] [cursor=pointer]
        - row [ref=e192]:
          - cell "#48" [ref=e193]
          - cell "Điện thoại" [ref=e194]
          - cell [ref=e195]:
            - button "Xóa" [ref=e196] [cursor=pointer]
```

# Test source

```ts
  48  |           // Check HTTP response status code
  49  |           // Accepted expected per human decision: 200 OK (api_specification.md §3.4 does not mandate 404).
  50  |           expect(deleteRes.status()).toBe(tc.expected_api_status || 200);
  51  |           return;
  52  |         }
  53  | 
  54  |         if (tc.tc_id === 'TC-DT-010') {
  55  |           // Public GET categories request per api_specification.md §3.4
  56  |           const res = await request.get('http://localhost:3000/api/categories');
  57  |           // Exact oracle: HTTP 200 OK
  58  |           expect(res.status()).toBe(200);
  59  |           return;
  60  |         }
  61  | 
  62  |         if (tc.tc_id === 'TC-DT-011') {
  63  |           // Regular user token attempting POST /api/categories
  64  |           const loginRes = await request.post('http://localhost:3000/api/login', {
  65  |             data: { email: tc.user_email, password: tc.user_password }
  66  |           });
  67  |           const { token } = await loginRes.json();
  68  |           const postRes = await request.post('http://localhost:3000/api/categories', {
  69  |             data: { name: 'Unauthorized Category' },
  70  |             headers: { Authorization: `Bearer ${token}` }
  71  |           });
  72  |           // Exact oracle per api_specification.md §6 (admin-only mutation requires admin token -> 403 Forbidden)
  73  |           expect(postRes.status()).toBe(403);
  74  |           return;
  75  |         }
  76  | 
  77  |         if (tc.tc_id === 'TC-DT-012') {
  78  |           // Invalid JWT token request
  79  |           const res = await request.get('http://localhost:3000/api/categories', {
  80  |             headers: { Authorization: `Bearer ${tc.token_value}` }
  81  |           });
  82  |           // Exact oracle: 401 Unauthorized for invalid Bearer token
  83  |           expect(res.status()).toBe(401);
  84  |           return;
  85  |         }
  86  |       }
  87  | 
  88  |       // UI Web Automation Flow for Admin Panel
  89  |       if (tc.auth_state === 'unauthenticated') {
  90  |         await page.goto('http://localhost:5174/');
  91  |         const loginForm = page.locator('form');
  92  |         await expect(loginForm).toBeVisible();
  93  |         return;
  94  |       }
  95  | 
  96  |       // Log in as Admin
  97  |       await loginAdmin(page, tc.admin_email, tc.admin_password);
  98  |       await goToCategoryTab(page);
  99  | 
  100 |       const categoryInput = page.locator('input[placeholder="Tên danh mục mới"]');
  101 |       const addButton = page.locator('button:has-text("Thêm mới")');
  102 |       const table = page.locator('table');
  103 | 
  104 |       if (tc.action === 'view_list') {
  105 |         await expect(table).toBeVisible();
  106 |         if (tc.expected_seeded_categories) {
  107 |           for (const catName of tc.expected_seeded_categories) {
  108 |             const row = page.locator(`tr:has-text("${catName}")`).first();
  109 |             await expect(row).toBeVisible();
  110 |           }
  111 |         }
  112 |       } else if (tc.action === 'create') {
  113 |         // Count pre-existing matching rows to detect duplicate addition
  114 |         const matchingRowsBefore = page.locator('tbody tr').filter({ hasText: tc.category_name });
  115 |         const countBefore = await matchingRowsBefore.count();
  116 | 
  117 |         await categoryInput.fill(tc.category_name);
  118 |         
  119 |         // Setup dialog listener for potential browser alert popup
  120 |         let alertMessage = null;
  121 |         page.once('dialog', async dialog => {
  122 |           alertMessage = dialog.message();
  123 |           await dialog.accept();
  124 |         });
  125 | 
  126 |         await addButton.click();
  127 |         await page.waitForTimeout(500);
  128 | 
  129 |         const matchingRowsAfter = page.locator('tbody tr').filter({ hasText: tc.category_name });
  130 |         const countAfter = await matchingRowsAfter.count();
  131 | 
  132 |         if (tc.tc_id === 'TC-DT-003') {
  133 |           // Empty name test: Specified expected: action blocked / error alert.
  134 |           // Observed SUT behavior: Empty row added to table.
  135 |           if (alertMessage) {
  136 |             expect(alertMessage.length).toBeGreaterThan(0);
  137 |           } else {
  138 |             // Assert error alert or non-creation
  139 |             expect(alertMessage).not.toBeNull();
  140 |           }
  141 |         } else if (tc.tc_id === 'TC-DT-004') {
  142 |           // Duplicate test: Specified expected: blocked with alert.
  143 |           // Observed SUT behavior: Duplicate row added (countAfter > countBefore).
  144 |           if (alertMessage) {
  145 |             expect(alertMessage).toContain('đã tồn tại');
  146 |           } else {
  147 |             // If no alert appeared, assert that count did not increase (must reject duplicate)
> 148 |             expect(countAfter).toBe(countBefore);
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  149 |           }
  150 |         } else if (tc.expected_status === 'success') {
  151 |           expect(countAfter).toBeGreaterThan(0);
  152 |         }
  153 |       } else if (tc.action === 'delete') {
  154 |         const rowToDelete = page.locator(`tr:has-text("${tc.target_category_name}")`).first();
  155 |         if (await rowToDelete.isVisible()) {
  156 |           const deleteButton = rowToDelete.locator('button:has-text("Xóa")');
  157 | 
  158 |           page.once('dialog', async dialog => {
  159 |             await dialog.accept();
  160 |           });
  161 | 
  162 |           await deleteButton.click();
  163 |           await page.waitForTimeout(500);
  164 | 
  165 |           if (tc.tc_id === 'TC-DT-008') {
  166 |             // Delete category with linked products: Approved expected result is "blocked with warning".
  167 |             // Assert that the category row is NOT removed from table (deletion blocked) or warning alert shown.
  168 |             const remainingRow = page.locator(`tr:has-text("${tc.target_category_name}")`);
  169 |             await expect(remainingRow.first()).toBeVisible();
  170 |           }
  171 |         }
  172 |       } else if (tc.action === 'view_empty_list') {
  173 |         await expect(table).toBeVisible();
  174 |       }
  175 |     });
  176 |   }
  177 | 
  178 | });
  179 | 
```