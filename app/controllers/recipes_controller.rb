class RecipesController < ApplicationController
  def index
    scope = Recipe.page(index_params[:page])
    scope = scope.search(index_params[:search]) if index_params[:search]

    # TODO: use jsonapi resources
    out = {
      data: scope.as_json(except: %i(created_at updated_at)),
      meta: {
        total: scope.total_pages
      }
    }

    respond_to do |format|
      format.html
      format.json { render json: out }
    end
  end

  private

  def index_params
    params.permit(:search, :page, :format)
  end
end
