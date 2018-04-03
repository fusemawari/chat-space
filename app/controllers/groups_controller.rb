class GroupsController < ApplicationController

  def create
  end

  def new
    @group = params {:name}

  end

  def edit
  end

  def update
  end

  private

  params.permit{}

end
