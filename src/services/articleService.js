import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { USER_ROLES } from './firebaseAuth';

// Article status constants
export const ARTICLE_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  EDITED: 'edited',
  APPROVED: 'approved',
  PUBLISHED: 'published',
  REJECTED: 'rejected'
};

// Create a new article (Writer)
export const createArticle = async (articleData, userId, userRole) => {
  try {
    if (userRole !== USER_ROLES.WRITER) {
      throw new Error('فقط الكتاب يمكنهم إنشاء مقالات جديدة');
    }

    const article = {
      ...articleData,
      authorId: userId,
      authorName: articleData.authorName,
      status: ARTICLE_STATUS.DRAFT,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: 1
    };

    const docRef = await addDoc(collection(db, 'articles'), article);
    return { success: true, articleId: docRef.id };
  } catch (error) {
    console.error('Create article error:', error);
    throw error;
  }
};

// Submit article for review (Writer)
export const submitArticleForReview = async (articleId, userId, userRole) => {
  try {
    if (userRole !== USER_ROLES.WRITER) {
      throw new Error('فقط الكتاب يمكنهم إرسال المقالات للمراجعة');
    }

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      status: ARTICLE_STATUS.SUBMITTED,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Submit article error:', error);
    throw error;
  }
};

// Assign article to editor (Editor-in-Chief)
export const assignArticleToEditor = async (articleId, editorId, userId, userRole) => {
  try {
    if (userRole !== USER_ROLES.EDITOR_IN_CHIEF) {
      throw new Error('فقط رئيس التحرير يمكنه تعيين المحررين');
    }

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      assignedEditorId: editorId,
      status: ARTICLE_STATUS.UNDER_REVIEW,
      assignedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Assign article error:', error);
    throw error;
  }
};

// Edit article (Editor)
export const editArticle = async (articleId, edits, userId, userRole) => {
  try {
    if (userRole !== USER_ROLES.EDITOR) {
      throw new Error('فقط المحررون يمكنهم تحرير المقالات');
    }

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      content: edits.content,
      editorNotes: edits.notes,
      editedBy: userId,
      editedAt: serverTimestamp(),
      status: ARTICLE_STATUS.EDITED,
      updatedAt: serverTimestamp(),
      version: edits.version || 1
    });

    return { success: true };
  } catch (error) {
    console.error('Edit article error:', error);
    throw error;
  }
};

// Approve article for publication (Editor-in-Chief)
export const approveArticle = async (articleId, userId, userRole) => {
  try {
    if (userRole !== USER_ROLES.EDITOR_IN_CHIEF) {
      throw new Error('فقط رئيس التحرير يمكنه الموافقة على النشر');
    }

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      status: ARTICLE_STATUS.APPROVED,
      approvedBy: userId,
      approvedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Approve article error:', error);
    throw error;
  }
};

// Publish article (Editor-in-Chief)
export const publishArticle = async (articleId, userId, userRole) => {
  try {
    if (userRole !== USER_ROLES.EDITOR_IN_CHIEF) {
      throw new Error('فقط رئيس التحرير يمكنه نشر المقالات');
    }

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      status: ARTICLE_STATUS.PUBLISHED,
      publishedBy: userId,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Publish article error:', error);
    throw error;
  }
};

// Reject article (Editor or Editor-in-Chief)
export const rejectArticle = async (articleId, reason, userId, userRole) => {
  try {
    if (![USER_ROLES.EDITOR, USER_ROLES.EDITOR_IN_CHIEF].includes(userRole)) {
      throw new Error('فقط المحررون ورئيس التحرير يمكنهم رفض المقالات');
    }

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      status: ARTICLE_STATUS.REJECTED,
      rejectionReason: reason,
      rejectedBy: userId,
      rejectedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Reject article error:', error);
    throw error;
  }
};

// Get articles based on user role and filters
export const getArticles = async (userId, userRole, filters = {}) => {
  try {
    let q = collection(db, 'articles');
    
    // Apply role-based filters
    if (userRole === USER_ROLES.WRITER) {
      q = query(q, where('authorId', '==', userId));
    } else if (userRole === USER_ROLES.EDITOR) {
      q = query(q, where('assignedEditorId', '==', userId));
    }
    
    // Apply status filter if provided
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    // Order by creation date
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const articles = [];
    
    querySnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return articles;
  } catch (error) {
    console.error('Get articles error:', error);
    throw error;
  }
};

// Get article by ID
export const getArticleById = async (articleId) => {
  try {
    const articleRef = doc(db, 'articles', articleId);
    const articleDoc = await getDocs(articleRef);
    
    if (articleDoc.exists()) {
      return { id: articleDoc.id, ...articleDoc.data() };
    } else {
      throw new Error('المقال غير موجود');
    }
  } catch (error) {
    console.error('Get article by ID error:', error);
    throw error;
  }
}; 