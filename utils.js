function formatComment(comment) {
    return {
      id: comment.id,
      user: comment.user?.login,
      body: comment.body,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      url: comment.html_url
    };
  }

  // Error handler
async function handleError(context, error) {
    context.app.log.error('PR processing error:', error);
    
    await context.octokit.issues.createComment({
      ...context.repo(),
      issue_number: context.payload.pull_request.number,
      body: '❌ Error processing PR: ' + error.message
    });
  }