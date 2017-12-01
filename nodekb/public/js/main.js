$(document).ready( () => {
  $('.delete-article').on('click', e => {
    $target = $(e.target);
    var id = ('target: ', $target.attr('data-id'));
    $.ajax({
      type: 'DELETE',
      url: '/articles/'+id,
      success: () => {
        
      }
    });
  });
});